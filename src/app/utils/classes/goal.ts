import * as moment from "moment";
import {GoalType} from "../types/goal-type";
import {Figure} from "./figure";
import {Moment} from "moment";

export class Goal{
    private readonly type: GoalType
    constructor(private data: any) {
        this.type = data.type;
    }

    getType (): GoalType { return this.type}

    getTarget () {
        if(this.type =='TIME'){
            return moment(this.data.target).format("YYYY-MM-DD")
        }else{
            return "$"+Figure.fromCents(this.data.target).inDollars()
        }
    }

    isAchieved () {
        if(this.data.achieved_at){
            return true;
        }
        return false;
    }
}
