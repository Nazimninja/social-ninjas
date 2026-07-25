// Force build 4 to switch production API URL to the working social-ninjas project
export const getApiUrl = (path: string): string => {
  const isProd = window.location.hostname !== 'localhost';
  const base = isProd ? 'https://social-ninjas.vercel.app' : '';
  return `${base}${path}`;
};
