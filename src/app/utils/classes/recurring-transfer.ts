import * as moment from "moment";
import {daysToString, padZeros} from "../functions";
import {Figure} from "./figure";
import {FundMember} from "./fund-member";

export class RecurringTransfer {
    protected prefix: string = 'RTX'

    constructor(protected data: any, private member: FundMember | undefined) {
    }

    getMember () {return this.member; }

    getAmount(): Figure {
        return Figure.fromCents(this.data.amount)
    }

    getFrequency(): number {
        return this.data?.frequency;
    }

    getFrequencyDescriptor(): string {
        return daysToString(this.data?.frequency)
    }

    getStartDate() {
        if(isNaN(this.data.start_date)){
            return moment(this.data.start_date)
        }else{
            return moment.unix(this.data.start_date)
        }
    }

    getStartDateFormatted() {
        return this.getStartDate().format("YYYY-MM-DD")
    }

    getTransactionID() {
        return this.prefix + padZeros(this.data.id);
    }

    getInterval() {
        return this.data.interval
    }

    getNextPayFormatted() {
        return this.getNextPay().format("YYYY-MM-DD")
    }

    getNextPay() {
        const now = moment();
        let next = this.getStartDate();

        if (this.getFrequency()) {
            while (now.isAfter(next)) {
                next = next.add(this.getFrequency() + "", "days")
            }
        }
        return next;
    }


}
