export interface Fund {
    getBalance(): number,
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
