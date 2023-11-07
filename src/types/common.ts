export interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type ISignUpUser = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserDecodedTokenData = {
  id: string;
  role: string;
  iat: number;
  exp: number;
};
