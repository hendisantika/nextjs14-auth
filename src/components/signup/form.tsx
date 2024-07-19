// Ensuring client-side code
'use client';

// Importing necessary modules and components
import Link from "next/link";
import {signUp} from "@/actions/auth";
import {useFormState} from "react-dom";
import SignupButton from "./signup-button";

export default function Form() {
    // Using useFormState to manage the form state and handle sign-up actions
    const [formState, action] = useFormState(signUp, {
        errors: {},
    });

    // Rendering the sign-up form
    return (
        <div className="space-y-3 items-center">
            <form action={action}>
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className='mb-3 text-2xl'>
                        Sign Up Now!
                    </h1>
                    <div className="w-full mb-4">
                        {/* Email Input */}
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your email"
                                type="email"
                                id="email"
                                name="email"
                                defaultValue=''
                            />
                            {/* Displaying email errors if any */}
                            {formState?.errors.email
                                && <div className="text-sm text-red-500">
                                    {formState.errors.email.join(', ')}
                                </div>
                            }
                        </div>
                        {/* Password Input */}
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                name="password"
                                defaultValue=''
                            />
                            {/* Displaying password errors if any */}
                            {formState?.errors.password
                                && <div className="text-sm text-red-500">
                                    {formState.errors.password.join(', ')}
                                </div>
                            }
                        </div>
                        {/* Name Input */}
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Enter your name"
                                type="text"
                                id="name"
                                name="name"
                                defaultValue=''
                            />
                        </div>
                        {/* Displaying name errors if any */}
                        {formState?.errors.name
                            && <div className="text-sm text-red-500">
                                {formState.errors.name.join(', ')}
                            </div>
                        }
                    </div>
                    {/* Including the SignupButton component */}
                    <SignupButton/>
                    <div className='mt-4 text-center'>
                        {/* Providing a link to the login page */}
                        Already have an account?&nbsp;
                        <Link className='underline' href='/login'>Login</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}