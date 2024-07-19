'use client'

// Importing necessary dependencies
import {useSession} from "next-auth/react";
import {logout} from "@/actions/auth";
import Link from "next/link";

// Defining the Member Dashboard Component
export default function Dashboard() {
    // Using useSession hook to obtain user session information
    const {data: session, status} = useSession()

    // Rendering the Member Dashboard JSX content
    return (
        <div className="flex flex-col">
            <div className="mb-4">
                {/* Displays Member Area information using sessions from useSession */}
                <p>Member Area</p>
                <p>Signed in as&nbsp;
                    {status === 'authenticated'
                        ? session?.user?.email
                        : '...'
                    }
                </p>
                {/* Link to Member Settings Page */}
                <Link className="underline" href='/member/settings'>Settings</Link>
            </div>
            {/* Logout Form */}
            {/* We have created the action in src\actions\auth.ts */}
            <form action={logout}>
                {/* Logout Button */}
                <button disabled={status === 'loading' ? true : false}
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 disabled:bg-slate-50 disabled:text-slate-500">
                    Sign Out {status === 'loading' ? '...' : ''}
                </button>
            </form>
        </div>
    );
}
