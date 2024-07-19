// Ensuring server-side code
'use server';

// Importing necessary modules and components
import {signIn} from '@/auth';
import {AuthError} from 'next-auth';
import {EmailNotVerifiedError} from '@/errors';

// Authenticating function for sign-in
export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await isUsersEmailVerified(formData.get('email') as string);
        await signIn('credentials', formData);
    } catch (error) {
        // Handling authentication errors
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }

        // Handling email verification errors
        if (error instanceof EmailNotVerifiedError) {
            return error?.message;
        }

        // Throwing other unexpected errors
        throw error;
    }
}

// Defining the schema for sign-up form validation
const signUpSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(3).max(255),
});

// Interface for the sign-up form state
interface SignUpFormState {
    errors: {
        name?: string[];
        email?: string[];
        password?: string[];
        _form?: string[];
    };
}