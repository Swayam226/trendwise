"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-[#1c1c1e] border-b border-[#2a2a2a] shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* ✅ Fix: Static consistent logo text */}
                <Link href="/" className="text-2xl font-semibold text-white tracking-tight">
                    <span>Trend</span><span className="text-blue-500">Wise</span>
                </Link>


                {/* Links */}
                <div className="flex items-center space-x-6 text-sm">
                    <Link href="/" className="text-[#f1f1f1] hover:text-blue-400">Home</Link>
                    <Link href="/articles" className="text-[#f1f1f1] hover:text-blue-400">Articles</Link>
                    <Link href="/admin" className="text-[#f1f1f1] hover:text-blue-400">Admin</Link>

                    {session ? (
                        <button onClick={() => signOut()} className="text-[#f1f1f1] hover:text-red-500">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => signIn("google")} className="text-[#f1f1f1] hover:text-blue-400">
                            Login
                        </button>
                    )}
                </div>

            </div>
        </nav>
    );
}
