// Check if we’re on a subdomain
const subdomain = window.location.host.split(".")[1]
  ? window.location.host.split(".")[0]
  : false;

export default subdomain;
