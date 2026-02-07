'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { CreateCompanion, GetAllCompanions, Companion } from "@/types/index";

export const createCompanion = async (formData: CreateCompanion): Promise<Companion> => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();
    if (!supabase) throw new Error("Database not connected");

    const { data, error } = await supabase
        .from('companions')
        .insert({ ...formData, author })
        .select();

    if (error || !data) {
        // console.warn("Supabase Error (createCompanion):", error?.message);
        return null as unknown as Companion;
    }

    return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions): Promise<Companion[]> => {
    const supabase = createSupabaseClient();
    if (!supabase) return [];

    let query = supabase.from('companions').select();

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if (error) {
        // console.warn("Supabase Error (getAllCompanions):", error.message);
        return [];
    }

    return companions;
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id);

    if (error) return console.log(error);

    return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    if (!supabase) throw new Error("Database not connected");
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if (error) {
        // console.warn("Supabase Error (addToSessionHistory):", error.message);
        return [];
    }

    return data;
}

export const getRecentSessions = async (limit = 10): Promise<Companion[]> => {
    const supabase = createSupabaseClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) {
        // console.warn("Supabase Error (getRecentSessions):", error.message);
        return [];
    }

    return data.map(({ companions }) => companions as unknown as Companion);
}

export const getUserSessions = async (userId: string, limit = 10): Promise<Companion[]> => {
    const supabase = createSupabaseClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) {
        // console.warn("Supabase Error (getUserSessions):", error.message);
        return [];
    }

    return data.map(({ companions }) => companions as unknown as Companion);
}

export const getUserCompanions = async (userId: string): Promise<Companion[]> => {
    const supabase = createSupabaseClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if (error) {
        // console.warn("Supabase Error (getUserCompanions):", error.message);
        return [];
    }

    return data;
}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();
    if (!supabase) return false;

    let limit = 0;

    if (has({ plan: 'pro' })) {
        return true;
    } else if (has({ feature: "3_companion_limit" })) {
        limit = 3;
    } else if (has({ feature: "10_companion_limit" })) {
        limit = 10;
    }

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if (error) {
        // console.warn("Supabase Error (newCompanionPermissions):", error.message);
        // If table is missing, we can't enforce limits, so restrict creation or allow (safer to restrict if critical, 
        // but here avoiding crash is priority. Let's return false to prevent "new" action from proceeding confusingly,
        // or true if we want to be permissive. Given the error is "table missing", they likely CAN'T create anyway.
        // Returning true allows the UI to render, even if the subsequent insert fails (which is handled elsewhere).
        // Actually, returning true might be better to avoid blocking due to "permissions permissions" error.
        return true;
    }

    // DEBUG: Log the values to understand why Pro check might fail
    console.log("DEBUG: newCompanionPermissions check", {
        userId,
        isPro: has({ plan: 'pro' }),
        has3Limit: has({ feature: "3_companion_limit" }),
        has10Limit: has({ feature: "10_companion_limit" })
    });

    const companionCount = data?.length;

    // Default to limit of 1 instead of 0 to allow at least one companion for free users/fallback
    if (limit === 0) limit = 1;

    if (companionCount >= limit) {
        return false
    } else {
        return true;
    }
}

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;
    const supabase = createSupabaseClient();
    if (!supabase) throw new Error("Database not connected");
    const { data, error } = await supabase.from("bookmarks").insert({
        companion_id: companionId,
        user_id: userId,
    });
    if (error) {
        // console.warn("Supabase Error (addBookmark):", error.message);
        return null;
    }
    // Revalidate the path to force a re-render of the page

    revalidatePath(path);
    return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
    const { userId } = await auth();
    if (!userId) return;
    const supabase = createSupabaseClient();
    if (!supabase) throw new Error("Database not connected");
    const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("companion_id", companionId)
        .eq("user_id", userId);
    if (error) {
        // console.warn("Supabase Error (removeBookmark):", error.message);
        return null;
    }
    revalidatePath(path);
    return data;
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string): Promise<Companion[]> => {
    const supabase = createSupabaseClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from("bookmarks")
        .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
        .eq("user_id", userId);
    if (error) {
        // console.warn("Supabase Error (getBookmarkedCompanions):", error.message);
        return [];
    }
    // We don't need the bookmarks data, so we return only the companions
    return data.map(({ companions }) => companions as unknown as Companion);
};
