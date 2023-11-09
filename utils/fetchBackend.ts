export default async (url: string, config?: any) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8080";
  url = `${backendUrl}${url}`;
  return await fetch(url, {
    method: "GET",
    ...config,
    headers: {
      Authorization: `Basic ${process.env.BASIC_AUTH}`,
    },
  });
};
