"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = theme === "dark";
  const toggleTheme = () => {
    setTheme(dark ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {mounted &&
        (dark ? (
          <Sun className="hover:cursor-pointer hover:text-primary" />
        ) : (
          <Moon className="hover:cursor-pointer hover:text-primary" />
        ))}
    </Button>
  );
};

export default ToggleMode;
