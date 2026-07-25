export const getApiUrl = (path: string): string => {
  const isProd = window.location.hostname !== 'localhost';
  const base = isProd ? 'https://social-ninjas-main.vercel.app' : '';
  return `${base}${path}`;
};
