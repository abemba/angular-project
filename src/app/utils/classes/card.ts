import {Fund} from "./fund";
import {Figure} from "./figure";
import {HttpClient} from "@angular/common/http";
import {getEndpoint} from "../endpoints";
import {DefinedHttpContexts} from "../context";

export class Card{
  constructor(private data: any, private http: HttpClient) {
  }

  getBrand () {return this.data.brand}
  getLast4 () {return this.data.last_4}
  getExpiration () {return this.data.exp_year+' '+this.data.exp_month}
  getDescriptor () {return this.getBrand()+' ***'+this.getLast4()};
  getId () {return this.data.id}

  credit(account: Fund, amount: Figure, form: any = {}){
      return this.http.post(getEndpoint("funds.pipes.card",{ fund: account.getId(), card: this.getId() }), {amount: amount.inCents(), ...form }, {context: new DefinedHttpContexts().refresh()})
  }
}
