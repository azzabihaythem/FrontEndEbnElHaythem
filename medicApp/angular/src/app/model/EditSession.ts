import { PatientwID } from "./PatientwID";
import { SeanceType } from "./SeanceType";

export class EditSeance {


    constructor(
           public id?: number,
           public date?: Date, 
           public seanceType?: SeanceType,
           public patient?: PatientwID,
          
         
       
    
           ) {}
    
    }