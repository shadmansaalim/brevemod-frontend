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
