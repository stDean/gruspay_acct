/**
 * Routes used for authentication.
 * These routes redirects logged in users to /settings.
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/"];

/**
 * Route to redirect when a users successfully logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/transaction";
