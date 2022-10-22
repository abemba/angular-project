import {Percent} from "./percent";
import {Figure} from "./figure";

export class Chargeable{
    constructor(private amount: Figure, private basefee: Figure, private commission: Percent) {
    }

    getAmount (): Figure {
        return this.amount;
    }

    getBaseFee (): Figure {
        return this.basefee;
    }

    getCommission (): Percent{
        return this.commission;
    }

    getCost (): Figure {
        return Figure.fromCents(this.basefee.inCents() + this.commission.of(this.amount.inCents()))
    }

    getCharge (): Figure {
        const inCents = this.amount.inCents() + this.getCost().inCents();
        return Figure.fromCents(inCents);
    }
}
