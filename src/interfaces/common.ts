import { ENUM_USER_ROLES } from "@/enums/user";

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

export type IMetaData = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type IUser = {
  _id: string;
  role: ENUM_USER_ROLES;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt: Date;
  cart: {
    courses: ICourse[];
    payment: {
      subTotal: number;
      tax: number;
      grandTotal: number;
    };
  };
  purchases: ICourse[];
};