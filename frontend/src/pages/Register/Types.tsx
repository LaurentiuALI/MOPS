import { ILoginValues } from "../Login/Types";

export interface IFormValues extends ILoginValues {
  Email: string;
  Nickname?: string;
  "Repeat password": string;
}

export interface IRegisterRequest {
  Username: string;
  Email: string;
  Nickname?: string;
  Password: string;
  "Repeat password"?: string;
  Role: string;
}
