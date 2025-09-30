
let serverUrl = "https://bault.onrender.com/api/v1";

if(import.meta.env.VITE_APP_ENV !== 'production' ){
    serverUrl = "http://localhost:8000/api/v1";
}

export const server = serverUrl; 
