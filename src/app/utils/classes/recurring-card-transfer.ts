import {RecurringTransfer} from "./recurring-transfer";
import {Card} from "./card";
import {HttpClient} from "@angular/common/http";
import {FundMember} from "./fund-member";

export class RecurringCardTransfer extends RecurringTransfer{
    override prefix = "RTC"
    constructor(data: any, member: FundMember | undefined,private http: HttpClient) {
        super(data, member);
    }

    getCard (): Card {
        return new Card(this.data.card, this.http);
    }
}
