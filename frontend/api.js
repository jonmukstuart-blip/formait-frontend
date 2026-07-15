const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://formait-backend.onrender.com/api";

window.API_BASE = API_BASE;

console.log("[API BASE LOADED]", API_BASE);