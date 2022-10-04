import { Abilities } from "./abilities";

export const AuthTokenTypes = {
    APPLICATION_ACCESS: 
    {
        key: 'APPLICATION_ACCESS',
        abilities: [Abilities.ACCESS_APPLICATION]
    },
    ELEVATED_ACCESS: 
    {
        key: 'RESTRICTED_ACCESS',
        abilities: [Abilities.APPROVE_REQUEST,Abilities.TRANSFER_OUT]
    },
}