"use client";

import React from "react";
import { useSession } from "@clerk/nextjs";
import { checkUserRole } from "@/lib/clerk/userUtils";

function ServerLayout({
  admin,
  member,
  manager,
}: {
  admin: React.ReactNode;
  member: React.ReactNode;
  manager: React.ReactNode;
}) {
  const { session } = useSession();
  if (!session) return null;
  const userRole = checkUserRole(session);

  return (
    /* Go to dashboard via different role by clerk */
    <>
      {userRole === "org:admin"
        ? admin
        : userRole === "org:member"
        ? member
        : manager}
    </>
  );
}

export default ServerLayout;
