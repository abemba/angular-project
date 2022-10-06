import { HttpContextToken } from "@angular/common/http";
import { Abilities } from "./abilities";

export const AlgofameHttpContext = {
    GRANT: new HttpContextToken<Abilities>(() => Abilities.TRANSFER_OUT),
    REFRESH: new HttpContextToken<boolean>(()=> true)
}