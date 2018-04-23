export interface IConfig {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  NODE_ENV: string;
  host: string;
  port: number;
}

export const config: IConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  host: process.env.HOST || "127.0.0.1",
  port: parseInt(process.env.NODE_PORT, 10) || 3000,
};
