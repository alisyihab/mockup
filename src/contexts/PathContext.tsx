import { createContext, useContext, useEffect, useState } from "react";

const PathContext = createContext("");

export const PathProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <PathContext.Provider value={currentPath}>{children}</PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);
