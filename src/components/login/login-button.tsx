'use client'

// Importing necessary dependencies
import {useFormStatus} from "react-dom"

// Defining the Login Button Component
export default function LoginButton() {
    // Obtaining form status, especially pending status, from useFormStatus hook
    const {pending} = useFormStatus()

    // Rendering the Login Button JSX content
    // renders a button with conditional styling and text based on the pending status.
    // If pending, it displays '...' after 'Login'.
    return <button type="submit"
                   className="bg-gray-200 py-2 rounded w-full disabled:bg-slate-50 disabled:text-slate-500"
                   disabled={pending ? true : false}>
        Login {pending ? '...' : ''}
    </button>
}