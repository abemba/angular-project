import * as moment from "moment";
import {Figure} from "./figure";
import {padZeros} from "../functions";
import {FundMember} from "./fund-member";

export class PendingBankTransfer{
    constructor(private data: any, private member: FundMember | undefined) {
    }

    getMember(): FundMember | undefined{
        return this.member
    }

    getAmount () {
        return Figure.fromCents(this.data.charged)
    }

    getScheduledDate(){
        return moment(this.data.scheduled_date)
    }

    getScheduledDateFormatted () {
        return this.getScheduledDate().format("YYYY-MM-DD")
    }

    getId () {
        return this.data.id;
    }

    getTransactionID () {
        return 'PBT'+padZeros(this.getId());
    }

    getType (): "CREDIT" | "DEBIT" {
        return this.data.type == 200 ? "CREDIT" : "DEBIT"
    }

    getState () {
        let state = "Unknown";
        switch (this.data.state) {
            case 100:
                state ="SCHEDULED"
                break;
            case 101:
            case 102:
                state = "IN-TRANSIT"
                break;
            case 103:
                state = "PROCESSING"
                break;
            case 144:
                state = "CANCELLED"
                break;
            case 104:
                state = "SUCCESS"
                break;
            default:
                break;
        }
        return state;
    }
}
