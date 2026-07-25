// Force build 3 to apply Vercel env variable SUPABASE_CRM_SERVICE_KEY on main project
export const getApiUrl = (path: string): string => {
  const isProd = window.location.hostname !== 'localhost';
  const base = isProd ? 'https://social-ninjas-main.vercel.app' : '';
  return `${base}${path}`;
};
