// Ensuring server-side code
'use server';

// Importing necessary modules and components
import {signIn} from '@/auth';
import {AuthError, User} from 'next-auth';
import {EmailNotVerifiedError} from '@/errors';
import {redirect} from "next/navigation";
import {db} from "@/db";

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

// Sign-up function handling form validation and user creation
export async function signUp(formState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
    // validate the sign up form
    const result = signUpSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // returns a validation error if the payload does not match our validation rules
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    // make sure the user does not enter a registered email
    const isEmailExists = await findUserByEmail(result.data.email);

    if (isEmailExists) {
        return {
            errors: {
                email: ['Email already exists'],
            },
        };
    }

    const hashed = await generatePasswordHash(result.data.password);

    const verificationToken = generateEmailVerificationToken();

    let user: User;
    try {
        // create user data
        user = await db.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashed,
                emailVerifToken: verificationToken,
            },
        });
    } catch (error: unknown) {
        // Handling database creation errors
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            };
        }
    }

    // Sending email verification
    await sendVerificationEmail(result.data.email, verificationToken);

    // Redirecting to the email verification page
    redirect(`/email/verify/send?email=${result.data.email}&verification_sent=1`);
}