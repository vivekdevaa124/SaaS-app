import { UserProfile } from "@clerk/nextjs";

const SettingsPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Settings</h1>
            <UserProfile path="/dashboard/settings" routing="path" />
        </div>
    );
}

export default SettingsPage;
