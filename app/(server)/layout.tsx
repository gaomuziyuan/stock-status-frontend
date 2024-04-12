"use client";

import { setLoginState } from "@/lib/redux/slices/userSlice/userSlice";
import { RootState } from "@/lib/redux/store";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";

export default function ServerLayout({
  admin,
  manager,
  member,
  senior,
}: {
  admin: React.ReactNode;
  manager: React.ReactNode;
  member: React.ReactNode;
  senior: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: { username: string; role: string } = jwtDecode(token);
      dispatch(
        setLoginState({
          isLoggedIn: true,
          username: decodedToken.username,
          role: decodedToken.role,
        })
      );
    }
  }, [dispatch, user]);

  if (!user.role) {
    return <Loading />;
  }

  return (
    <>
      {user.role === "admin"
        ? admin
        : user.role === "manager"
        ? manager
        : user.role === "member"
        ? member
        : senior}
    </>
  );
}
