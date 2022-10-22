import {Percent} from "./percent";
import {Chargeable} from "./chargeable";
import {Figure} from "./figure";

export class ChargeableBase{
    constructor(private basefee: Figure, private commission: Percent) {
    }

    of(amount: Figure): Chargeable{
        return new Chargeable(amount,this.basefee,this.commission)
    }

    ofDollars (amount: number){
        return this.of(Figure.fromDollars(amount))
    }

    ofCents (amount: number){
        return this.of(Figure.fromCents(amount))
    }
}
