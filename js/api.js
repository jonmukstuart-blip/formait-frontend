const isLocalDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const API_BASE = isLocalDevelopment
    ? "http://localhost:5000"
    : "https://formait-backend.onrender.com";

window.API_BASE = API_BASE;

console.log("[API BASE LOADED]", API_BASE);