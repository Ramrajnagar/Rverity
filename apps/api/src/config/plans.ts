export const PLAN_MAP: Record<string, string> = {
    'P-PRO-CREATOR': 'P-4RE32865YG152694NNGCO7FQ', // Real Sandbox Plan ID
    'P-BUSINESS-PLUS': 'P-1DE18887FJ728143PNGCPPHY', // Real Sandbox Plan ID
};

export const REVERSE_PLAN_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(PLAN_MAP).map(([key, value]) => [value, key])
);
