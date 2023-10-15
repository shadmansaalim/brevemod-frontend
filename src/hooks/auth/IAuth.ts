export type ISignUpUser = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};
