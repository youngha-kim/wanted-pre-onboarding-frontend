const ACCESS_KEY = "access_Token";

export function getStoredToken() {
  const storedToken = localStorage.getItem(ACCESS_KEY);
  return storedToken ? storedToken : null;
}

export function setStoredToken(accessToken) {
  localStorage.setItem(ACCESS_KEY, accessToken);
}

export function clearStoredToken() {
  localStorage.removeItem(ACCESS_KEY);
}
