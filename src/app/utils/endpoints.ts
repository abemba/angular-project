const host = "http://localhost/api/";
const items = host + "items/";
const funds = items + "funds/";
const common = funds + "common/";
const common_fund = common + ":fund/";
const pipes = common_fund + "pipes/";
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
    },
    INIT: {
        DATA:items+'app/init'
    },
    PROFILE: {
        UPDATE: items + "profile",
        DOCUMENTS: items + "profile/documents",
    },
    FUNDS: {
        PRIVATE: {
            SET_GOAL: funds + 'private/:id/set-goal'
        },
        TRANSACTIONS: {
            NOTE: items + 'transactions/note',
            DETAILS: items + 'transactions',
        },
        PIPES: {
            LOCAL: pipes + "local/:local"
        }
    }
}