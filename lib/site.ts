function normalizeSiteUrl(rawUrl: string) {
	return rawUrl.replace(/\/+$/, "");
}

const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

const resolvedUrl = fromEnv
	? fromEnv
	: fromVercel
		? `https://${fromVercel}`
		: "https://nafaz-company.vercel.app";

export const siteUrl = normalizeSiteUrl(resolvedUrl);