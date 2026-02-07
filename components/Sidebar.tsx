import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const sidebarLinks = [
    {
        label: "Dashboard",
        route: "/dashboard",
        icon: "/icons/dashboard.svg", // Placeholder
    },
    {
        label: "Sessions",
        route: "/dashboard/sessions",
        icon: "/icons/sessions.svg", // Placeholder
    },
    {
        label: "Settings",
        route: "/dashboard/settings",
        icon: "/icons/settings.svg", // Placeholder
    },
];

const Sidebar = () => {
    return (
        <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8 max-md:hidden lg:w-[264px] p-6">
            <div className="flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={36}
                        height={36}
                    />
                    <span className="text-xl font-bold text-primary">Converso</span>
                </Link>

                <div className="flex flex-col gap-4 mt-8">
                    {sidebarLinks.map((link) => (
                        <Link
                            href={link.route}
                            key={link.label}
                            className="flex gap-4 items-center p-4 rounded-lg hover:bg-primary/5 cursor-pointer transition-all"
                        >
                            <p className="font-semibold text-black">{link.label}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 p-2">
                <UserButton showName />
            </div>
        </section>
    );
};

export default Sidebar;
