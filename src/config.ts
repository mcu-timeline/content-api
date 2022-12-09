const DEFAULT_PORT = 4000;

export type Config = {
  PORT: number;
  NEO4J_URI: string;
  NEO4J_USER: string;
  NEO4J_PASSWORD: string;
  AUTH0_ISSUER_URL: string;
  AUTH0_AUDIENCE: string;
};

export const config = (): Config => ({
  PORT: Number(process.env.PORT || DEFAULT_PORT),
  NEO4J_URI: process.env.NEO4J_URI,
  NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
  NEO4J_USER: process.env.NEO4J_USER,
  AUTH0_ISSUER_URL: process.env.AUTH0_ISSUER_URL,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
});
