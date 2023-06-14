import { Dispatch, SetStateAction } from "react";

export interface authProps {
  setExistedUser: Dispatch<SetStateAction<boolean>>;
}

export interface authReq {
  email: string;
  password: string;
}

export interface authRes {
  access_token: string
}
