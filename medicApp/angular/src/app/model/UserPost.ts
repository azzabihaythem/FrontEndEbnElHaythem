import { Clinique } from "./Clinique";

export class UserPost {
  constructor(
    public active?: false,
    public birthDate? : Date,
    public firstName?: string,
    public lastName?: string, 
    public login?: string,
    public password?: string,
    public clinique?: Clinique
    ) {}
}
