import React from "react";
import {useLink, useRouterContext, useRouterType,} from "@refinedev/core";
import {Space, theme, Typography} from "antd";
import type {RefineLayoutThemedTitleProps} from "@refinedev/antd";


export const ThemedTitleV2: React.FC<
    RefineLayoutThemedTitleProps
    & { isHeader?: boolean }
> = ({
         collapsed,
         isHeader,
         text: textFromProps,
         wrapperStyles,
     }) => {

    const Icon = () => {
        return <img src="/favicon.ico" alt="icon"/>;
    }

    const text = typeof textFromProps === "undefined" ? process.env.NEXT_PUBLIC_COMPANY_NAME : textFromProps as string;

    const Logo = () => {
        return <img src="/logo.png" alt="logo"/>;
    }

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
                {isHeader ? (<>
                    <div
                        style={{
                            height: "24px",
                            width: "24px",
                            color: token.colorPrimary,
                        }}
                    >
                        <Icon/>
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
                </>) : (<Logo/>)}
            </Space>
        </ActiveLink>
    );
};



