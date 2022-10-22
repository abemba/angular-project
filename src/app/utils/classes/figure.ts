export class Figure{
    constructor(private cents: number){}

    /**
     * Dollar value of the figure
     * @returns
     */
    inDollars(){
        return this.cents/100;
    }

    /**
     * Dollar absolute value of the figure
     * @returns
     */
    inDollarsAbsolute(){
        return Math.abs(this.inDollars());
    }

    /**
     * Cents value of the figure
     * @returns
     */
    inCents(){
        return this.cents;
    }

    subtract (amount: Figure) {
        return Figure.fromCents(this.inCents() - amount.inCents())
    }

    add (amount: Figure) {
        return Figure.fromCents(this.inCents() + amount.inCents())
    }

    /**
     * Cents value of the figure
     * @returns
     */
    inCentsAbsolute(){
        return Math.abs(this.inCents());
    }

    static fromDollars (amount: number) {
        return new Figure(Math.round(amount*100));
    }

    static fromCents (amount: number) {
        return new Figure(Math.round(amount));
    }
}
