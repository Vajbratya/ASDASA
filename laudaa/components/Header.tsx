import React from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Menu, Bell, User } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-background text-foreground p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">RAPIDPK</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Input placeholder="Search..." className="w-64" />
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;