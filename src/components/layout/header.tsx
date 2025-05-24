"use client";

import {DownOutlined, LogoutOutlined} from "@ant-design/icons";
import {ColorModeContext} from "@contexts/color-mode";
import type {RefineThemedLayoutV2HeaderProps} from "@refinedev/antd";
import {
    useActiveAuthProvider,
    useGetIdentity,
    useIsExistAuthentication,
    useLogout,
    useTranslate,
    useTranslation,
    useWarnAboutChange
} from "@refinedev/core";
import {
    Avatar,
    Button,
    Dropdown,
    Layout as AntdLayout,
    Menu,
    type MenuProps,
    Space,
    Switch,
    theme,
    Typography,
} from "antd";
import React, {useContext} from "react";
import Cookies from "js-cookie";

type IUser = {
    id: number;
    name: string;
    avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
                                                                      sticky,
                                                                  }) => {
    const {getLocale, changeLocale} = useTranslation();
    const currentLocale = getLocale();
    const {token} = theme.useToken();
    const {data: user} = useGetIdentity<IUser>();
    const {mode, setMode} = useContext(ColorModeContext);
    const translate = useTranslate();
    const isExistAuthentication = useIsExistAuthentication();
    const {warnWhen, setWarnWhen} = useWarnAboutChange();
    const authProvider = useActiveAuthProvider();
    const {mutate: mutateLogout} = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const languageMenuItems: MenuProps["items"] = ["jp", "en"]
        .sort()
        .map((lang: string) => ({
            key: lang,
            onClick: () => {
                changeLocale(lang);
                Cookies.set("NEXT_LOCALE", lang);
            },
            label: lang === "en" ? "English" : "日本語",
            icon: (
                <span style={{marginRight: 8}}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`}/>
        </span>
            ),
        }));

    const headerStyles: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
    };

    if (sticky) {
        headerStyles.position = "sticky";
        headerStyles.top = 0;
        headerStyles.zIndex = 1;
    }

    const handleLogout = () => {
        if (warnWhen) {
            const confirm = window.confirm(
                translate(
                    "warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have unsaved changes."
                )
            );

            if (confirm) {
                setWarnWhen(false);
                mutateLogout();
            }
        } else {
            mutateLogout();
        }
    };


    const logout = isExistAuthentication && (
        <Button
            key="logout"
            onClick={() => handleLogout()}
            icon={<LogoutOutlined/>}
        >
            {translate("buttons.logout", "Logout")}
        </Button>
    );

    return (
        <AntdLayout.Header style={headerStyles}>
            <Dropdown
                menu={{
                    items: languageMenuItems,
                    selectedKeys: currentLocale ? [currentLocale] : [],
                }}
            >
                <Button type="text">
                    <Space>
                        <Avatar size={16} src={`/images/flags/${currentLocale}.svg`}/>
                        <Typography.Text>
                            {currentLocale === "en" ? "English" : "日本語"}
                        </Typography.Text>
                        <DownOutlined/>
                    </Space>
                </Button>
            </Dropdown>
            <Space>
                <Switch
                    checkedChildren="🌛"
                    unCheckedChildren="🔆"
                    onChange={() => setMode(mode === "light" ? "dark" : "light")}
                    defaultChecked={mode === "dark"}
                />
                {(user?.name || user?.avatar) && (
                    <Space style={{marginLeft: "8px"}} size="middle">
                        {user?.name && (
                            <Typography.Text strong>{user.name}</Typography.Text>
                        )}
                        {/*{user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}*/}
                        {logout}
                    </Space>
                )}
            </Space>
        </AntdLayout.Header>
    );
};
