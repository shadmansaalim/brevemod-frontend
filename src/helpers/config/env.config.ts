export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3030/api/v1";
};
