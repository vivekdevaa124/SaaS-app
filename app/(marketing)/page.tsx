import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-center">
                Welcome to Converso
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-gray-500 text-center">
                Your Real-time AI Teaching Platform.
            </p>
            <div className="mt-10 flex gap-4">
                <Link
                    href="/dashboard"
                    className="rounded-md shadow w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    )
}
