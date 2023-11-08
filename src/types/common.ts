import { ENUM_USER_ROLES } from "@/enums/user";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export type ResponseSuccessType = {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;
  meta?: IMeta;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  success: boolean;
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

export type ICourse = {
  _id: string;
  title: string;
  description: string;
  instructorName: string;
  totalRating: number;
  ratingCount: number;
  avgRating: number;
  price: number;
  thumbnailLink: string;
  introVideoLink: string;
  lecturesCount: number;
  projectsCount: number;
  studentsCount: number;
};

export type ICart = {
  _id: string;
  user: string;
  courses: string[];
  payment: {
    subTotal: number;
    tax: number;
    grandTotal: number;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type IUser = {
  _id: string;
  role: ENUM_USER_ROLES;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt: string;
  __v?: number;
};

export type ICourseReview = {
  _id: string;
  course: ICourse;
  user: IUser;
  rating: number;
  words: string;
};

export type IUserUpdateData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  role: string;
};

export type IFeedback = {
  _id: string;
  user: Pick<IUser, "_id" | "firstName" | "middleName" | "lastName" | "email">;
  feedback: string;
};

export type ICourseAddUpdateData = {
  title: string;
  description: string;
  instructorName: string;
  price: number;
  thumbnailLink: string;
  introVideoLink: string;
  lecturesCount: number;
  projectsCount: number;
};
