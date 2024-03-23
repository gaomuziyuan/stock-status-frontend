import { Suspense } from "react";
import AuthLoading from "../../loading";
import { SignIn } from "@clerk/nextjs";

export default function AuthSignInPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <SignIn />
    </Suspense>
  );
}
