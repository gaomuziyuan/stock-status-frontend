"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/lib/types/user";
import { Switch } from "@/components/ui/switch";
import Combobox from "@/components/combobox/Combobox";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/users`)
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const toggleUserStatus = async (userId: string, status: boolean) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/users/${userId}`,
        {
          isActive: status,
        }
      );
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isActive: status } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">User Management</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <div className="font-bold">ID</div>
          <div className="font-bold">Username</div>
          <div className="font-bold">Role</div>
          <div className="font-bold">Permission</div>

          {users.map((user) => (
            <React.Fragment key={user.id}>
              <div className="px-4 py-2">{user.id}</div>
              <div className="px-4 py-2">{user.username}</div>
              <Combobox id={user.id} role={user.role} />
              <Switch
                checked={user.isActive}
                onCheckedChange={() =>
                  toggleUserStatus(user.id, !user.isActive)
                }
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
