import { NextPage } from "next";
import React, { useContext, useEffect } from "react";
import { Context } from "./_app";
import { Button, Empty } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import HorizontalMenu from "@/Components/Common/HorizontalMenu";
import CartList from "@/Components/Cart/CartList";

const cart: NextPage = () => {
  const { cartItem, setCurrentMenu, setCartItem } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/");
    } 
  }, []);

  const handleMenuReset = () => {
    if (setCurrentMenu) setCurrentMenu("home");
  };

  return (
    <>
      <HorizontalMenu>
        {cartItem && Object.keys(cartItem).length ? (
          <CartList
            cartItem={cartItem}
            setCartItem={setCartItem}
          />
        ) : (
          <div style={{ minHeight: "100dvh" }} className='center'>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description='No Cart Item'>
              <Button type='primary'>
                <Link href='/dashboard' onClick={handleMenuReset}>
                  Shop Now
                </Link>
              </Button>
            </Empty>
          </div>
        )}
      </HorizontalMenu>
    </>
  );
};

export default cart;
