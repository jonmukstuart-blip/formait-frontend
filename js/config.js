// Centralized Environment Auto-Selector Engine
const getEnvConfig = () => {
    const hostname = window.location.hostname;
    
    // Define development environments
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.");
    
    if (isLocalhost) {
        return {
            API_BASE_URL: "https://formait-backend.onrender.com/api/leads",
            SOCKET_SERVER_URL: "https://formait-backend.onrender.com",
            ENV: "development"
        };
    }
    
    // Production Fallbacks based on your environment profile
    return {
        API_BASE_URL: "https://formait-group.com",
        SOCKET_SERVER_URL: "https://formait-group.com",
        ENV: "production"
    };
};

export const config = getEnvConfig();
