import * as moment from "moment";

export class FundInvite{
    private readonly status: "accepted" | "declined" | "pending"
    constructor(private data: any) {
        this.status = data.accepted_at ? "accepted"
            : data.declined_at ? "declined"
            : "pending";
    }

    getFullname () {
        return this.data.first_name + ' ' + this.data.last_name;
    }

    getEmail () {
        return this.data.email;
    }

    getStatus () {
        return this.status;
    }

    getDateFormatted () {
        return moment(this.data.created_at).format("YYYY-MM-DD");
    }
}
