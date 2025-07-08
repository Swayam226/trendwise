"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <nav className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" className="text-xl font-bold text-blue-600">
                TrendWise
            </Link>

            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <span className="hidden sm:block text-gray-700">Hi, {session.user.name.split(" ")[0]}</span>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}
