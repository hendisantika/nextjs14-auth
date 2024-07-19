// Importing NextAuth and the authentication configuration
import NextAuth from 'next-auth';
import {authConfig} from './auth.config';

// Exporting the authentication middleware using NextAuth and the provided configuration
export default NextAuth(authConfig).auth;

// Additional configuration for the middleware
export const config = {
    // Defining a matcher to specify routes where the middleware should be applied
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
