"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Settings,
  Menu,
  LayoutDashboard,
  Files,
  Book,
  Calendar,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function SidebarButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full cursor-pointer">
      <Button
        variant="ghost"
        className={cn(
          "flex w-full justify-center h-12 text-primary/70 hover:text-primary p-0",
          isActive && "bg-primary/10"
        )}
      >
        {children}
      </Button>
    </Link>
  );
}

const SidebarContent: React.FC = () => {
  return (
    <>
      <div className="flex flex-row items-center p-2">
        <Image
          src="/ZUAILogo.png"
          width={48}
          height={48}
          alt="zuai"
          className="md:w-full h-auto rounded-md w-12"
        />
      </div>

      <div className="flex flex-col space-y-4 w-full px-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <LayoutDashboard className="h-6 w-6" />
                <span className="ml-2 block md:hidden">Home</span>
              </SidebarButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <Book className="h-6 w-6" />
                <span className="ml-2 block md:hidden">Book</span>
              </SidebarButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Book</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <Files className="h-6 w-6" />
                <span className="ml-2 block md:hidden">copy</span>
              </SidebarButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>copy</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <SidebarButton href="">
                <FileQuestion className="h-6 w-6" />
                <span className="ml-2 block md:hidden">FileQuestion</span>
              </SidebarButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>FileQuestion</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-3 top-3 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-10 left-4 z-50"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
          <div className="h-full flex flex-col justify-between py-4">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
      <div className="justify-between hidden md:flex rounded-lg bg-white w-16 h-[97vh] flex-col items-center pb-4 transition-all duration-300 border-r border-slate-200 fixed z-10 ">
        <div>
          <SidebarContent />
        </div>
        <div className="flex flex-col space-y-4 w-full px-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
