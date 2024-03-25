"use client";

import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

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
