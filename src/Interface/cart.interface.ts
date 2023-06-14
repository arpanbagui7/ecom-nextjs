import { ICart } from ".";
import { Dispatch, SetStateAction } from "react";

export interface cartListProps {
  cartItem: ICart;
  setCartItem: Dispatch<SetStateAction<ICart>> | undefined;
}

export interface cartColumns {
  productId: string;
  image: string | null;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface createOrderReq {
  orderAmt: number;
  products: {
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export interface createOrderRes {
  id: string;
  userId: string;
  orderAmt: number;
  createdAt: Date;
  updatedAt: Date;
}
