"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
    const { data: session } = useSession();

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            {session ? (
                <>
                    <h1 className="text-2xl mb-4">Welcome, {session.user.name}</h1>
                    <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                    <h1 className="text-2xl mb-4">Login to TrendWise</h1>
                    <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Sign in with Google
                    </button>
                </>
            )}
        </main>
    );
}
