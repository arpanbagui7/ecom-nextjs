import { Col, MenuProps, Row } from "antd";
import { Menu } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useContext } from "react";
import { horizontalMenuProps } from "@/Interface/horizontalMenu.interface";
import { Context } from "@/pages/_app";

const HorizontalMenu: React.FC<horizontalMenuProps> = ({ children }) => {
  const { currentMenu, setCurrentMenu } = useContext(Context);
  const menuItems: MenuProps["items"] = [
    {
      label: <Link href='/dashboard'>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link href='/order'>Orders</Link>,
      key: "order",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link href='/cart'>Cart</Link>,
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
  ];

  const handleClick: MenuProps["onClick"] = (e) => {
    if (setCurrentMenu) setCurrentMenu(e.key);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={20}>
          <Menu
            onClick={handleClick}
            selectedKeys={[currentMenu ?? "home"]}
            mode='horizontal'
            items={menuItems}
          />
        </Col>
        <Col span={4}></Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>{children}</Col>
      </Row>
    </>
  );
};

export default HorizontalMenu;
