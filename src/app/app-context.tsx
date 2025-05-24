"use client";

import {DevtoolsProvider} from "@providers/devtools";
import { ThemedLayoutV2, useNotificationProvider} from "@refinedev/antd";
import {type I18nProvider, Refine} from "@refinedev/core";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import React, {type PropsWithChildren, Suspense} from "react";
import {ColorModeContextProvider} from "@contexts/color-mode";
import {dataProvider} from "@providers/data-provider";
import {authProviderClient} from "@providers/auth-provider/auth-provider.client";
import {useLocale, useTranslations} from "next-intl";
import {setUserLocale} from "@i18n";
import {Header} from "@components/layout/header";
import {usePathname} from "next/navigation";
import {ThemedSiderV2} from "@components/layout/sider";
import {ThemedTitleV2} from "@components/layout/title";
import Resources from "@providers/resources/resources";
import {ThemedLayout} from "@components/themed-layout";


type Props = {
    themeMode?: string;
};

export const AppContext = ({
                               themeMode,
                               children,
                           }: PropsWithChildren<Props>) => {
    const t = useTranslations();

    const pathname = usePathname();
    const isLoginPage = pathname === "/login";


    const i18nProvider: I18nProvider = {
        translate: (key: string, options: any) => t(key, options),
        getLocale: useLocale,
        changeLocale: setUserLocale,
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RefineKbarProvider>
                <ColorModeContextProvider defaultMode={themeMode}>
                    <DevtoolsProvider>
                        <Refine
                            routerProvider={routerProvider}
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider}
                            authProvider={authProviderClient}
                            i18nProvider={i18nProvider}
                            resources={Resources()}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                useNewQueryKeys: true,
                            }}
                        >
                            {isLoginPage ? (
                                children
                            ) : (
                                <ThemedLayout>
                                    {children}
                                </ThemedLayout>
                            )}
                            <RefineKbar/>
                        </Refine>
                    </DevtoolsProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </Suspense>
    );
};
