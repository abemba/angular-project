import {Figure} from "../classes/figure";

export interface FundInterface {
    getBalance(): Figure,
    getFundName(): string,
    getFundNumber(): string,
    getRawTransactions(): any[],
    isPrivate(): boolean
}
