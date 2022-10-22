import {RecurringTransfer} from "./recurring-transfer";

export class RecurringBankTransfer extends RecurringTransfer{
    protected override prefix: string = "RTB"

    getType () : "DEBIT" | "CREDIT" {
        return this.data.type == 200 ? "CREDIT" : "DEBIT"
    }
}
