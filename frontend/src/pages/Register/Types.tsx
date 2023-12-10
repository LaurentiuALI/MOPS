export interface IFormValues {
  Username: string;
  Email: string;
  Nickname?: string;
  Password: string;
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
