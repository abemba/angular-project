import * as moment from "moment";

export class FundMember {
    constructor (private data: any){
    }

    getId() {
        return this.data.id;
    }

    getGridId () {
        return this.data.grid_account_user_id;
    }

    getEmtDomain(){ return this.data.grid_emt_domain; }
    getEmtChallenge(){ return this.data.grid_emt_challenge; }
    getEmtChallengeResponse(){ return this.data.grid_emt_challenge_response; }

    getFullname () {
        return this.data?.user.profile?.first_name + ' ' + this.data?.user.profile?.last_name
    }

    getDateJoinedFormatted() {
        const date = this.data.created_at ? moment(this.data.created_at) : moment();
        return date.format("YYYY-MM-DD")
    }
}
