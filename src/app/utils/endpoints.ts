import {environment} from "../../environments/environment";

const host = environment.apiEndpoint;
const items = host + "items/";
const funds = items + "funds/";
const requests = items + "funds/shared/:fund/requests/action/";
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
    CONTACTS: {
        CREATE: items + "contacts",
        MODIFY: items + "contacts/:id",
    },
    INIT: {
        DATA: items + 'app/init'
    },
    PROFILE: {
        UPDATE: items + "profile",
        DOCUMENTS: items + "profile/documents",
    },
    FUNDS: {
        PRIVATE: {
            SET_TIME_GOAL: funds + 'private/:id/goals/target/time',
            SET_BALANCE_GOAL: funds + 'private/:id/goals/target/balance',
        },
        TRANSACTIONS: {
            NOTE: items + 'transactions/note',
            DETAILS: items + 'transactions',
        },
        PIPES: {
            LOCAL: pipes + "local/:local",
            BANK: {
                OUT: pipes + "bank/:id/out",
                IN: pipes + "bank/:id/in",
            },
            CARD: pipes + "card/:card",
            EMT: pipes + "emt",
        },
        PROFILE: {
            NAME: common_fund + 'update/name',
            ARCHIVE: common_fund + 'update/archive',
        },
        CREATE: items + "funds"
    },
    PIPES: {
        BANK: items + 'pipes/banks',
        CARDS: items + 'pipes/stripe/cards',
    },
    TOOLS: {
        replace: (url: string, params: any) => {
            if(params){
                for (const [key, value] of Object.entries(params)){
                    url = url.replace(":"+key, String(value).toString() )
                }
            }
            return url;
        }
    },
    REQUESTS: {
        INVITE: requests + "invite",
        TRANSFER_OUT: requests + "transfer-out",
        UPDATE_POLICY: requests + "update-policy",
    }
}

export function getEndpoint (name: string, replace: any = undefined){
    const endpoints =  Endpoints;
    name = name.toUpperCase();
    return Endpoints.TOOLS.replace(name.split('.').reduce((a: any, b: string) => a[b], endpoints), replace);
}
