// Check if we’re on a subdomain
var parts = window.location.hostname.split(".");
var firstPart = parts.shift();
var subdomain = firstPart === "screenhole" ? false : firstPart;

export default subdomain;
