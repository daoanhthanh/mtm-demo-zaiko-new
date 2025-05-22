import React from "react";
import {useLink, useRefineOptions, useRouterContext, useRouterType,} from "@refinedev/core";
import {Space, theme, Typography} from "antd";
import type {RefineLayoutThemedTitleProps} from "@refinedev/antd";
// import AppIcon from '@icons/icon.svg';
import AppIcon from '@icons/icon.svg';


export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
                                                                          collapsed,
                                                                          icon: iconFromProps,
                                                                          text: textFromProps,
                                                                          wrapperStyles,
                                                                      }) => {
    const {title: {icon: defaultIcon, text: defaultText} = {}} =
        useRefineOptions();

    const icon =
        typeof iconFromProps === "undefined" ? defaultIcon : iconFromProps;

    const text =
        typeof textFromProps === "undefined" ? process.env.NEXT_PUBLIC_COMPANY_NAME : textFromProps;
    const {token} = theme.useToken();
    const routerType = useRouterType();
    const Link = useLink();
    const {Link: LegacyLink} = useRouterContext();

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
