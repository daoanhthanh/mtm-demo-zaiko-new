"use client";

import {Header, ThemedSiderV2, ThemedTitleV2} from "@components/layout";
import {ThemedLayoutV2} from "@refinedev/antd";
import React from "react";

export const ThemedLayout = ({children}: React.PropsWithChildren) => {
    return (
        <ThemedLayoutV2
            Header={() => <Header sticky/>}
            Sider={ThemedSiderV2}
            Title={({collapsed}) => <ThemedTitleV2 collapsed={collapsed} isHeader/>}
        >
            {children}
        </ThemedLayoutV2>
    );
};
