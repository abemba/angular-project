import {Figure} from "./figure";

export class EmtConfig{
    constructor(private data: any) {
    }

    getDefaultDomain (){ return this.data.domain}
    getDefaultChallenge (){ return this.data.challenge}
    getDefaultResponse (){ return this.data.response}
    getBaseFee (): Figure{ return Figure.fromDollars(this.data.base_fee)}
}
