"use server";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  // console.log(path, "path","baseurl", baseURL, );
  const res = await fetch(`${baseURL}/${path}`);
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
  const data = await res.json();
  // console.log(data, "data");
  return data;
};

export const serverMutation = async (path, data) => {
  const res = await fetch(`${baseURL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
