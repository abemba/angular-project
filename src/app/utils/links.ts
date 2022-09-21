export class Links{
    public static readonly BASE = "https://algofame.com/api";
    public static readonly COMMON_DATA = Links.BASE+"/common-data";

    // Private Funds
    public static readonly PRIVATE_FUND_URL = Links.BASE+ "/funds/private/:id";
    public static readonly SET_GOAL = Links.PRIVATE_FUND_URL+ "/set-goal";
}