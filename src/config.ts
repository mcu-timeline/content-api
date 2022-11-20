const DEFAULT_PORT = 4000;

export type Config = {
  PORT: number;
  NEO4J_URI: string;
  NEO4J_USER: string;
  NEO4J_PASSWORD: string;
};

export const config = (): Config => ({
  PORT: Number(process.env.PORT || DEFAULT_PORT),
  NEO4J_URI: process.env.NEO4J_URI,
  NEO4J_PASSWORD: process.env.NEO4J_PASSWORD,
  NEO4J_USER: process.env.NEO4J_USER,
});
