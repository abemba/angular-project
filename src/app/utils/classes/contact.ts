import {HttpClient} from "@angular/common/http";
import {getEndpoint} from "../endpoints";
import {DefinedHttpContexts} from "../context";
import {tap} from "rxjs";

export class Contact{
    static readonly COLLECTED_FROM: any = { INVITE: "INVITE", EMT:"EMT_TRANSFER_OUT", CONTACT_PAGE: "CONTACT_PAGE" }
    constructor(private data: any = {}, private http: HttpClient) {
    }
    setFirstName (name: string){ this.data.first_name = name}
    setLastName (name: string){ this.data.last_name = name}
    setPhone (phone: string){ this.data.phone = phone}
    setEmail (email: string){ this.data.email = email}
    getEmail (){ return this.data.email}
    getLastName (){ return this.data?.last_name}
    getFirstName (){ return this.data?.first_name }
    getPhone (){ return this.data?.phone }
    getId (){ return this.data?.id }
    getData () {
        return this.data;
    }
    create () {
        return this.http.post(getEndpoint("contacts.create"), this.data, { context: new DefinedHttpContexts().refresh()}).pipe(
            tap({
                next: value => this.data = value
            })
        )
    }

    update () {
        return this.http.post(getEndpoint("contacts.modify",{id: this.getId()}), this.data, { context: new DefinedHttpContexts().refresh()}).pipe(
            tap({
                next: value => this.data = value
            })
        )
    }

    getDescriptor () {
        return this.getFirstName() + ' ' + this.getLastName()
    }
}
