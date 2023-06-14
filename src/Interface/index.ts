import { Dispatch, SetStateAction } from "react";

export * from "@/Interface/auth.interface";
export * from "@/Interface/dashboard.interface";
export * from "@/Interface/error.interface";
export * from "@/Interface/cart.interface";
export * from "@/Interface/order.interface";

export interface IContext {
  currentMenu?: string;
  setCurrentMenu?: Dispatch<SetStateAction<string>>;
  cartItem?: ICart;
  setCartItem?: Dispatch<SetStateAction<ICart>>;
}

export interface ICart {
  [key: string]: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    image: string | null;
    total: number;
  };
}
