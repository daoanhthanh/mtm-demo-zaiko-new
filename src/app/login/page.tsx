
import { AuthPage } from "@components/pages/auth";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";

export default async function Login() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo ?? "/");
  }

  return <AuthPage 
      type="login"
      formProps={{
        initialValues: {
          email: "admin@eeeCloud.jp",
          password: "demodemo",
        },
      }}
  />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
