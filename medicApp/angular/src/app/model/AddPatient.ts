import { List } from "echarts";
import { Clinique } from "./Clinique";
import { PriseEnCharges } from "./PriseEnCharges";
import { UserPost } from "./UserPost";

export class AddPatient {


constructor(
   
       public affile?: string, 
       public desactivationDate?: Date,
       public doit?: string,
       public numAffiliation?: string,
       public seanceDays?: string [],
       public priseEnCharges?:PriseEnCharges[],
       public user?: UserPost,
   

       ) {}

}