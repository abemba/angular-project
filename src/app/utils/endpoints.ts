const host = "http://localhost/api/";
const items = host + "items/";
const auth = host + "auth/";
export const Endpoints = {
    AUTH: {
        REGISTER: auth + "register",
        VERIFY: auth + "verify",
        LOGIN: auth + "login",
        GRANTS: auth + "grants",
        LOGOUT: auth + "logout",
        UPDATE_EMAIL: auth + "update/email",
        UPDATE_PASSWORD: auth + "update/password",
        RESET_PASSWORD: auth + "reset/password",
    }
}