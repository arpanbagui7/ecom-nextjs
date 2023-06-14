import { Dispatch, SetStateAction } from "react";

export interface IError {
  statusCode: number;
  message: string | string[];
}

export interface categoryProps {
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  categories: categoryRes[];
}

export interface categoryRes {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface productProps {
  products: productRes[];
}

export interface productRes {
  id: string;
  name: string;
  description: string | null;
  image: { type: string; data: number[] } | null;
  price: number;
  categoryid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface viewProductProps {
  productId: string;
}

export interface viewProductRes extends productRes {
  category: categoryRes;
}

export interface ImgLoader {
  src: string;
  quality?: number;
  width: number;
}
