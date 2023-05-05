export default {
    DB: process.env.DB_NAME!,
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER!,
    PASSWORD: process.env.DB_PASS,
};
