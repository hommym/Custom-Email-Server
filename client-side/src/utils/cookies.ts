export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax"; // Set the cookie
}

export function getCookie(name: string) {
  const cookieArray = document.cookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    const cookiePair = cookieArray[i].split('=');
    const trimmedName = cookiePair[0].trim();
    if (trimmedName === name) {
      return decodeURIComponent(cookiePair[1]); // Decode URI component to handle special characters
    }
  }
  return null; // Return null if cookie not found
}

export function createAuthorizationHeader(headers: any) {
  const token = getCookie('login');
  // Convert headers to Headers object if needed
  const headersInstance = new Headers(headers);
  headersInstance.set("domain", process.env.NEXT_PUBLIC_API_URL as string)
  if (token) {
    headersInstance.set('Authorization', `Bearer ${token}`);
  }
  return headersInstance;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}