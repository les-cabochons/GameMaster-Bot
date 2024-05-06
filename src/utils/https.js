import fetch from "node-fetch";

export const post = async (url, body) => {
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return response;
};

export const patch = async (url, body) => {
  const response = await fetch(url, {
    method: "patch",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  return response;
};
