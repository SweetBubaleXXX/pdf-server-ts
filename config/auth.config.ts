export const AUTH_SECRET = process.env.AUTH_SECRET || (() => { throw new Error('AUTH_SECRET must be specified') })();
export const TOKEN_EXPIRE_TIME = +(process.env.TOKEN_EXPIRE_TIME || 36000);