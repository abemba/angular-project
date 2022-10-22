import {HttpContext, HttpContextToken} from "@angular/common/http";
import { Abilities } from "./abilities";

export const AlgofameHttpContext = {
    GRANT: new HttpContextToken<Abilities>(() => Abilities.TRANSFER_OUT),
    REFRESH: new HttpContextToken<boolean>(()=> true)
}

export class DefinedHttpContexts extends HttpContext {
  grant () {
    this.set(AlgofameHttpContext.GRANT,AlgofameHttpContext.GRANT.defaultValue())
    return this;
  }

  refresh () {
    this.set(AlgofameHttpContext.REFRESH, AlgofameHttpContext.REFRESH.defaultValue())
    return this;
  }
}
