import { Abilities } from "./abilities";

export const AuthTokenTypes = {
    APPLICATION_ACCESS: 
    {
        key: 'APPLICATION_ACCESS',
        abilities: []
    },
    ELEVATED_ACCESS: 
    {
        key: 'ELEVATED_ACCESS',
        abilities: [Abilities.APPROVE_REQUEST,Abilities.TRANSFER_OUT]
    },
}