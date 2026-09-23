export const getApiUrl = (path: string): string => {
  if (typeof window !== 'undefined' && window.location) {
    // If testing on localhost, route calls to production Vercel backend
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `https://social-ninjas.vercel.app${path}`;
    }
    // In production browser, same-origin relative paths avoid CORS issues completely
    return path;
  }
  return `https://social-ninjas.vercel.app${path}`;
};
