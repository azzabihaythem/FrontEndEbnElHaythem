import { List } from "echarts";
import { Clinique } from "./Clinique";
import { PriseEnCharges } from "./PriseEnCharges";
import { UserPost } from "./UserPost";

export class Patient {

//   constructor(
//     public user?: UserPost,
//     public doit?: string,
//     public seanceDays?: string,
//     public affile?: string, 
//     public numAffiliation?: string,
//     public priseEnCharges?: List<priseEnCharges>,
//     public desactivationDate?: Date,
//     public active?: false,
//     public clinique?: Clinique
//     ) {}
// 


constructor(
       public id?: number,
       public affile?: string, 
       public desactivationDate?: Date,
       public doit?: string,
       public numAffiliation?: string,
       public seanceDays?: string [],
       //public seanceDays?: List<string>,
       //public priseEnCharges?: List<priseEnCharges>,
       public priseEnCharges?:PriseEnCharges[],
       public user?: UserPost,
       public createUser?: String,
       public creationDate?: String,
       public updateDate?: String,
       public updateUser?: String

       ) {}

}