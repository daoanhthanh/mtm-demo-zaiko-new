import React from "react";
import {
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";
import { Typography, theme, Space } from "antd";
import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
// import AppIcon from '@icons/icon.svg';
import AppIcon from '@icons/icon.svg';


export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  icon: iconFromProps,
  text: textFromProps,
  wrapperStyles,
}) => {

    const icon =
        typeof iconFromProps === "undefined" ? (
            <img src={AppIcon} alt="App Icon" style={{ height: "24px", width: "24px" }} />
        ) : (
            iconFromProps
        );
    
  const text =
    typeof textFromProps === "undefined" ? process.env.NEXT_PUBLIC_COMPANY_NAME : textFromProps;
  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          {icon}
        </div>

        {!collapsed && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
            }}
          >
            {text}
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );
};
