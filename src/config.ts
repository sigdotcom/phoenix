export interface IConfig {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_PROVIDER_NAME: string;
  NODE_ENV: string;
  host: string;
  port: number;
}

export const config: IConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "TEST_CLIENT_ID",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "TEST_CLIENT_SECRET",
  GOOGLE_PROVIDER_NAME: "google",
  NODE_ENV: process.env.NODE_ENV || "development",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT, 10) || 3000,
};
