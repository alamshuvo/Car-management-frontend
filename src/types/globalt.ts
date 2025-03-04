import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { JwtPayload } from 'jsonwebtoken';
type TError = {
  data: {
    message: string;
    stack: string;
    sucess: boolean;
  };
  status: number;
};
export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};
export type Tresponse<T> = {
  data?: T;
  error?: TError;
  meta?:TMeta,
  sucess:boolean,
  message:string
};

export type TResoponseRedux<T> = Tresponse<T> & BaseQueryApi

export type TQuearyParams = {
  name: string;
  value: boolean | React.Key;
}




export interface CustomJwtPayload extends JwtPayload {
  userEmail: string;
  userId: string;
  role: string;
}
