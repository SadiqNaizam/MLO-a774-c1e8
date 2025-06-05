import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  title?: string; // Optional title for the sidebar section
}

const Sidebar: React.FC<SidebarProps> = ({ children, className, title }) => {
  console.log("Rendering Sidebar");

  return (
    <aside className={cn("w-full md:w-64 lg:w-72 border-l p-4 space-y-4 hidden md:block", className)}>
      {title && <h2 className="text-lg font-semibold tracking-tight">{title}</h2>}
      <ScrollArea className="h-[calc(100vh-8rem)]"> {/* Adjust height based on surrounding layout */}
        <div className="pr-4">
            {children ? children : <p className="text-sm text-muted-foreground">Sidebar content goes here.</p>}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;