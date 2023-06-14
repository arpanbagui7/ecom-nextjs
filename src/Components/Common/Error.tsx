import { errorProps } from "@/Interface";
import { Context } from "@/pages/_app";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import Link from "next/link";
import { FC, useContext } from "react";

const Error: FC<errorProps> = ({ err: { message, statusCode } }) => {
  const { Text } = Typography;
  const { setCurrentMenu } = useContext(Context);

  const handleMenuReset = () => {
    if (setCurrentMenu) setCurrentMenu("home");
  };

  const listError = (messages: string[]) => {
    return messages.map((message) => (
      <ul>
        <li>
          <Text type='secondary'>{message}</Text>
        </li>
      </ul>
    ));
  };
  return (
    <>
      <Result
        status='500'
        title={statusCode}
        extra={
          <>
            {Array.isArray(message) ? (
              () => listError(message)
            ) : (
              <Text type='secondary'>{message}</Text>
            )}
            <Button type='primary'>
              {" "}
              <Link href='/dashboard' onClick={handleMenuReset}>
                <HomeOutlined />
                Home
              </Link>
            </Button>
          </>
        }
      />
    </>
  );
};

export default Error;
