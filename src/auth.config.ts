// Importing necessary types from NextAuth for configuration
import type {NextAuthConfig} from 'next-auth';

// Creating the configuration object for NextAuth
export const authConfig = {
    trustHost: true,

    // Defining custom pages to tailor the authentication experience. Here, we redirect the default sign-in page to '/login'.
    pages: {
        signIn: '/login',
    },

    // Configuring callbacks for handling authorization logic during authentication flow.
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            // Checking if the user is logged in
            const isLoggedIn = !!auth?.user;

            // Determining if the user is currently on the dashboard
            const isOnDashboard = nextUrl.pathname.startsWith('/member');

            // Handling authorization logic based on user status and location
            if (isOnDashboard) {
                // Redirecting unauthenticated users to the login page when attempting to access dashboard-related pages
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                // Redirecting authenticated users to the dashboard if they attempt to access authentication-related pages like login/signup
                const isOnAuth = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup';
                if (isOnAuth) return Response.redirect(new URL('/member', nextUrl));
                return true;
            }
            // Allowing access for other scenarios
            return true;
        },
    },

    // Placeholder array for authentication providers. We initialize it as empty for now, adding providers when required.
    providers: [], // We start with an empty array, adding providers as needed

} satisfies NextAuthConfig;