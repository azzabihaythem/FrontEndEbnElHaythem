import { Clinique } from "./Clinique";

export class UserEdit {
  constructor(
    public id?: number,
    public active?: false,
    public birthDate? : Date,
    public firstName?: string,
    public lastName?: string, 
    public login?: string,
    public password?: string,
    public clinique?: Clinique
    ) {}
}
