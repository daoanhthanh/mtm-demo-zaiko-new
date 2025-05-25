import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";
import React from "react";
import SettingsMenu from "./SettingsMenu";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo ?? "/login");
  }

  return (
    <>
      <SettingsMenu />
      {children}
    </>
  );
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}
