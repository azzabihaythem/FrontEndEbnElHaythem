/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PriseEnCharge } from './priseEnCharge';
import { User } from './user';


export interface Patient { 
    active?: boolean;
    affile?: string;
    createUser?: string;
    creationDate?: Date;
    desactivationDate?: Date;
    doit?: string;
    id?: number;
    localPatient?: boolean;
    numAffiliation?: string;
    priseEnCharges?: Array<PriseEnCharge>;
    seanceDays?: Array<Patient.SeanceDaysEnum>;
    updateDate?: Date;
    updateUser?: string;
    user?: User;
}
export namespace Patient {
    export type SeanceDaysEnum = 'FRIDAY' | 'MONDAY' | 'SATURDAY' | 'SUNDAY' | 'THURSDAY' | 'TUESDAY' | 'WEDNESDAY';
    export const SeanceDaysEnum = {
        FRIDAY: 'FRIDAY' as SeanceDaysEnum,
        MONDAY: 'MONDAY' as SeanceDaysEnum,
        SATURDAY: 'SATURDAY' as SeanceDaysEnum,
        SUNDAY: 'SUNDAY' as SeanceDaysEnum,
        THURSDAY: 'THURSDAY' as SeanceDaysEnum,
        TUESDAY: 'TUESDAY' as SeanceDaysEnum,
        WEDNESDAY: 'WEDNESDAY' as SeanceDaysEnum
    };
}
