'use client'

// Importing necessary actions and components
import {findUserByEmail, verifyEmail} from "@/actions/auth"
import Link from "next/link"
import {useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"

// Defining the Email Verification Component
export default function VerifyEmail() {
    // Accessing search parameters from the URL
    const searchParams = useSearchParams()

    // Extracts the email and token from the search parameters of the verification link URL
    // Here's an example link:
    // http://localhost:3000/email/verify?email=member@test.com&token=73b03a02ae3a2fcdd38a2a06df75b0abd26ca7aca5da7fb079200d118b1b0564
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    // State for managing loading state and result message
    const [isLoading, setIsLoading] = useState(true)
    const [result, setResult] = useState('Error verifying your email')

    // Effect hook for handling email verification process
    useEffect(() => {
        const emailVerification = async () => {
            try {
                // Checking if required fields are present
                if (!email || !token) {
                    throw new Error('Missing required fields');
                }

                // Finding user by email in the database
                const user = await findUserByEmail(email);
                if (!user) {
                    throw new Error('Invalid verification token');
                }

                // Validating the verification token
                if (token !== user.emailVerifToken) {
                    throw new Error('Invalid verification token');
                }

                // Updating user verification status in the database
                await verifyEmail(user.email)

                // Updating result message and indicating loading completion
                setResult('Email verified successfully. Please relogin.')
                setIsLoading(false)
            } catch (error) {
                console.error('Error verifying email:', error);
            }
        }

        // Initiating the email verification process
        emailVerification()
    }, [email, token])

    // Rendering the Email Verification Component
    return (
        <>
            {/* Displaying loading or result message */}
            <div className='mb-4'>{isLoading ? 'Please wait ...' : result}</div>

            {/* Navigation link back to the login page */}
            <div className='my-3'>
                <Link href='/login' className='bg-white py-3 px-2 rounded'>Back to Login</Link>
            </div>
        </>
    )
}