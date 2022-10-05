import { Figure } from "../services/fund.service";

export interface Fund {
    getBalance(): Figure,
    getFundName(): string,
    getFundNumber(): string,
    getPendingTransactions(): any[],
    getRecurringTransactions(): any[],
    getRawTransactions(): any[],
    isPrivate(): boolean,
    getEmtPipeInResponse(): string,
    getEmtPipeInChallenge(): string,
    getEmtDomain(): string
}
