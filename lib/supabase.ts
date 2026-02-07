import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.warn("Supabase credentials missing. Supabase functionality will be disabled.");
        return null;
    }

    return createClient(
        supabaseUrl,
        supabaseKey, {
        async accessToken() {
            try {
                const { getToken } = await auth();
                // Attempt to get the token with the 'supabase' template
                // If the template is missing, this will throw a 404 error
                const token = await getToken({ template: 'supabase' });
                return token || null;
            } catch (e) {
                // Suppress the error log to avoid showing the error overlay in development
                // prompting the user to fix the configuration if data is missing.
                return null;
            }
        }
    }
    )
}