import { PriseEnCharges } from "../model/PriseEnCharges";
import { UserPost } from "../model/UserPost";

export interface IPatient {
  // id: string;
  // img: string | ArrayBuffer;
  // name: string;
  // number: string;
  // age: number;
  // gender: string;
  // address: string;
  // status: string;
  // lastVisit: string;
        id: String;
        affile: string;
        desactivationDate: Date;
        doit: string;
        numAffiliation: string;
        seanceDays: string [];
        priseEnCharges:PriseEnCharges[];
        user: UserPost;
        createUser: String;
        creationDate: String;
        updateDate: String;
        updateUser: String;

       
}
