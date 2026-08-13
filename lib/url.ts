export function normalizeWebsite(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Website is required.");
  }
  const lowered = trimmed.toLowerCase();
  if (
    lowered.startsWith("javascript:") ||
    lowered.startsWith("data:") ||
    lowered.startsWith("file:") ||
    lowered.startsWith("vbscript:")
  ) {
    throw new Error("Enter a public https website.");
  }
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    throw new Error("Enter a valid website URL.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Enter a public https website.");
  }
  url.hostname = url.hostname.toLowerCase();
  if (url.hostname === "localhost" || url.hostname.endsWith(".local")) {
    throw new Error("Enter a public business website.");
  }
  url.hash = "";
  url.username = "";
  url.password = "";
  let href = url.toString();
  if (href.endsWith("/") && url.pathname === "/") {
    href = href.slice(0, -1);
  }
  return href;
}
