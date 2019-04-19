const siteRoot =
  process.env.NODE_ENV === "production" ? "screenhole" : "localhost";

// Check if we’re on a subdomain
const parts = window.location.hostname.split(".");
const firstPart = parts.shift();
const subdomain = firstPart === siteRoot ? false : firstPart;

export default subdomain;
