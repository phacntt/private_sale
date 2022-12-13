import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, SECRET_KEY} = process.env;
