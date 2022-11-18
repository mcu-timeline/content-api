const DEFAULT_PORT = 4000;

export type Config = {
  PORT: number;
};

export const config = (): Config => ({
  PORT: Number(process.env.PORT || DEFAULT_PORT),
});
