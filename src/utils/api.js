import { create } from "apisauce";

const apiEndpoint =
  process.env.NODE_ENV === "production" ? "/api" : "https://screenhole.net/api";

const api = create({
  baseURL: apiEndpoint,
  // baseURL: '/api',
  // baseURL: 'https://api.screenhole.net',
  // baseURL: 'https://screenhole-api.ngrok.io',
  // baseURL: "https://staging-api.screenhole.net",
});

api.websocketURL = "wss://api.screenhole.net";
// api.websocketURL = "wss://staging-api.screenhole.net";
// api.websocketURL = 'wss://screenhole-api.ngrok.io';

// reset on 401 API responses
api.addResponseTransform(response => {
  if (!response.ok) {
    if (response.status === 401) {
      // api.resetLocalStorage();
      // window.location = window.location;
    }
  }
});

api.currentUser = null;
api.currentHole = null;
api.authenticated = false;

api.setCurrentUser = user => {
  localStorage.setItem("user_current", JSON.stringify(user));

  api.currentUser = user;
};

api.setAuthHeader = token => {
  localStorage.setItem("default_auth_token", token);
  api.setHeader("Authorization", `Bearer ${token}`);

  api.authenticated = !!token;
};

api.resetLocalStorage = () => {
  localStorage.removeItem("default_auth_token");
  localStorage.removeItem("user_current");
};

if (localStorage.getItem("default_auth_token")) {
  api.setAuthHeader(localStorage.getItem("default_auth_token"));
}

if (localStorage.getItem("user_current")) {
  api.setCurrentUser(JSON.parse(localStorage.getItem("user_current")));
}

api.setCurrentHole = async subdomain => {
  // const res = await api.get(`/v2/holes/${subdomain}`);
  //
  // api.currentHole = "fuck";
};

export default api;
