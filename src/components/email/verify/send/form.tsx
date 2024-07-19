'use client'

// Importing necessary hooks and components
import {useFormState} from "react-dom";
import ResendButton from "./resend-button";
import {useSearchParams} from "next/navigation";
import {resendVerificationEmail} from "@/actions/auth";

export default function Form() {
    // Accessing search parameters from the URL
    const searchParams = useSearchParams()

    // Extracting email and verification_sent status from search parameters
    const email = searchParams.get('email')
    const verificationSent = Boolean(searchParams.get('verification_sent'))

    // Obtaining form state and action using useFormState hook
    const [formState, action] = useFormState(resendVerificationEmail.bind(null, email!), undefined);

    // Rendering the Email Verification Initiation Form
    return (
        <>
            {/* Displaying formState message if available */}
            {!!formState && (
                <div className="text-blue-500 mb-4">{formState}</div>
            )}

            {/* Displaying a success message if verification link has been sent */}
            {!!verificationSent && (
                <div className="text-green-500 mb-4">A verification link has been sent to your email.</div>
            )}

            {/* Rendering the form with the ResendButton component */}
            <div>
                <form action={action}>
                    <ResendButton/>
                </form>
            </div>
        </>
    )
}