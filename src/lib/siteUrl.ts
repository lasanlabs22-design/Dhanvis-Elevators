// Kept out of site.ts, which exports its own `process` (the install stages) and so hides Node's.
// On Vercel this is the project's production domain: the .vercel.app address, or the custom domain once one is
// connected. The fallback is used for local builds. CONFIRM: final production domain
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = vercel ? `https://${vercel}` : "https://www.dhanviselevators.com";
