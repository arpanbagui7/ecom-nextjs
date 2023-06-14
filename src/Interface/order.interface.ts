import { productRes } from "./dashboard.interface";
import { Key } from "react";

export interface getOrderRes extends orderRes {
  productOrders: productOrderRes[];
}

interface orderRes {
  id: string;
  userid: string;
  orderAmt: number;
  createdAt: Date;
  updatedAt: Date;
}

interface productOrderRes {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: productRes;
}

export interface orderListProps {
  orders: getOrderRes[];
}

export interface orderDetailProps {
  order: getOrderRes | null;
}
