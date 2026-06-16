"use server";

import { getUserToken } from "./session";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

export const serverFetch = async (path) => {
  // console.log(path, "path","baseurl", baseURL, );
  const res = await fetch(`${baseURL}/${path}`);
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  const text = await res.text();

  if (!text) {
    console.log("Empty response:", path);
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("Invalid JSON response:", text);
    return null;
  }
};

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseURL}/${path}`, {
    headers: await authHeader(),
  });
  return res.json();
};

export const serverMutation = async (path, data, options = "POST") => {
  const res = await fetch(`${baseURL}/${path}`, {
    method: options,
    headers: {
      "Content-Type": "application/json",
      ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
