import { productProps, productRes } from "@/Interface";
import { imageLoader } from "@/common-function";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Modal,
  message,
  Typography,
} from "antd";
import Image from "next/image";
import { FC, useRef, useState, useContext } from "react";
import ViewProduct from "./ViewProduct";
import { Context } from "@/pages/_app";

const Product: FC<productProps> = ({ products }) => {
  const { Meta } = Card;
  const { Text } = Typography;
  const { setCartItem, cartItem } = useContext(Context);
  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  const selectedProductId = useRef("");

  const handleView = (productId: string) => {
    selectedProductId.current = productId;
    setModalOpen(true);
  };

  const handleAddToCart = (product: productRes) => {
    const { id, name, price, image } = product;
    const imageString = image
      ? Buffer.from(image.data).toString("base64")
      : null;
    if (setCartItem) {
      if (!cartItem)
        setCartItem({
          [id]: {
            quantity: 1,
            name,
            price,
            image: imageString,
            total: price,
            productId: id,
          },
        });
      else if (cartItem[id])
        setCartItem({
          ...cartItem,
          [id]: {
            ...cartItem[id],
            quantity: cartItem[id].quantity + 1,
            total: price * (cartItem[id].quantity + 1),
          },
        });
      else
        setCartItem({
          ...cartItem,
          [id]: {
            quantity: 1,
            name,
            price,
            image: imageString,
            total: price,
            productId: id,
          },
        });
      messageApi.open({ type: "success", content: "Item added to cart" });
    }
  };

  const closeModal = () => {
    selectedProductId.current = "";
    setModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={16}>
        {products.map((product) => {
          const { id, name, description, image, price } = product;
          const imageString = image
            ? Buffer.from(image.data).toString("base64")
            : null;
          return (
            <Col key={id} span={6}>
              <Card
                hoverable
                cover={
                  <Image
                    loader={imageLoader}
                    src={`data:image/jpeg;base64,${imageString}`}
                    alt={name}
                    width={250}
                    height={250}
                  />
                }>
                <Meta
                  title={
                    <>
                      <Text>{name}</Text>
                      <br />
                      Price(₹) <Text type='secondary'>{price} ₨</Text>
                    </>
                  }
                  description={description}
                />
                <Divider />
                <Space>
                  <Button
                    type='primary'
                    onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                  <Button className='btn-info' onClick={() => handleView(id)}>
                    View
                  </Button>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal
        open={modalOpen}
        footer={null}
        onOk={closeModal}
        onCancel={closeModal}>
        <ViewProduct productId={selectedProductId.current} />
      </Modal>
    </>
  );
};

export default Product;
