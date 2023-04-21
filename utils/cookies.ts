import cookie from 'cookie';
import Cookies from 'js-cookie';

export function createSerializedCookie(token: string) {
  const isProdction = process.env.NODE_ENV === 'production';
  const maxAge = 60 * 60 * 24; // 1 day

  return cookie.serialize('sessionToken', token, {
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: isProdction,
    path: '/',
    sameSite: 'lax',
  });
}

export function getParsedCookie(key: string) {
  const cookieValue = Cookies.get(key);
  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type should be a string
  } catch (err) {
    return undefined;
  }
}

// more robust way to set items to set the cookie without stringify all the time
export function setStringifiedCookie(key: string, value: string) {
  Cookies.set(key, JSON.stringify(value));
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}
