export class Percent{
    constructor(private num: number) {
        if(num>100 || num <0){
            throw new Error("Number must be between 0 and 100");
        }
    }

    getInDecimal () {
        return this.num/100;
    }

    getInPercent () {
        return this.num;
    }

    static fromDecimal (decimal: number){
        return new Percent(decimal*100);
    }

    static fromPercent (percent: number){
        return new Percent(percent);
    }

    of(amount: number){
        return this.getInDecimal()*amount;
    }

}
