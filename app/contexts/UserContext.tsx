// contexts/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: string; // e.g., "admin", "teacher", "student", "secretary"
  avatar: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({
        name: "USV",
        email: "usv.ro",
        role: "student", // Default role
        avatar: "/avatars/shadcn.jpg",
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
