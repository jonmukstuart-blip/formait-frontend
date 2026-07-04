const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://formait-backend.onrender.com";

window.API_BASE = API_BASE;

console.log("[API BASE LOADED]", API_BASE);