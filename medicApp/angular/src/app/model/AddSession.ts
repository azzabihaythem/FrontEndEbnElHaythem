import { PatientwID } from "./PatientwID";
import { SeanceType } from "./SeanceType";

export class AddSeance {


    constructor(
       
           public date?: Date, 
           public seanceType?: SeanceType,
           public patient?: PatientwID,
          
         
       
    
           ) {}
    
    }