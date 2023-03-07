import cookie from 'cookie';

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
