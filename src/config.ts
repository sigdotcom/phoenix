export interface IConfig {
  ext: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_PROVIDER_NAME: string;
  SENDGRID_API_KEY: string;
  STRIPE_PRIVATE_TOKEN: string;
  STRIPE_PUBLIC_TOKEN: string;
  TEST_EMAIL: string;
  NODE_ENV: string;
  host: string;
  port: number;
}

export const config: IConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "TEST_CLIENT_ID",
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || "TEST_CLIENT_SECRET",
  GOOGLE_PROVIDER_NAME: "google",
  NODE_ENV: process.env.NODE_ENV || "development",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  STRIPE_PRIVATE_TOKEN: process.env.STRIPE_PRIVATE_TOKEN || "TEST",
  STRIPE_PUBLIC_TOKEN: process.env.STRIPE_PUBLIC_TOKEN || "TEST",
  TEST_EMAIL: process.env.TEST_EMAIL,
  ext: process.env.NODE_ENV !== "production" ? ".ts" : ".js",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT, 10) || 3000
};
