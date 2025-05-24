import { FC } from "react";

import { useGo, useNavigation } from "@refinedev/core";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Grid } from "antd";
import { Text } from "@components";
// import { useLocation } from "react-router-dom";

interface AddRecordButtonProps {
  entity: string;
  buttonText: string;
  block?: boolean;
  className?: string;
  additionalQuery?: Record<string, string>;
}

const AddRecordButton: FC<AddRecordButtonProps> = ({
  entity,
  buttonText,
  block,
  className,
  additionalQuery,
}) => {
  const go = useGo();
  // const { pathname } = useLocation();
  const { createUrl } = useNavigation();
  const screens = Grid.useBreakpoint();

  return (
    <Button
      block={block}
      className={className}
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={() => {
        return go({
          to: `${createUrl(entity)}?${new URLSearchParams(additionalQuery)}`,
          query: {
            to: "pathname",
          },
          options: {
            keepQuery: true,
          },
          type: "replace",
        });
      }}
      size={screens.xs ? "middle" : "large"}
      style={{
        marginTop: screens.xs ? "1.6rem" : "0.3rem",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: "16px",
          fontWeight: 400,
        }}
      >
        {/*{!screens.xs ? buttonText : null}*/}
        {buttonText}
      </Text>
    </Button>
  );
};

export default AddRecordButton;
