"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { getAllDepartamente } from "../app/services/departamenteService";

// Add the logo URL
const UNIVERSITATEA_LOGO_URL = "http://localhost:3000/logo.svg";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const [departments, setDepartments] = React.useState<
    { idDepartament: string; shortName: string; longName: string }[]
  >([]);
  const [activeDepartment, setActiveDepartment] = React.useState<{
    idDepartament: string;
    shortName: string;
    longName: string;
  } | null>(null);

  // Fetch departments on component mount
  React.useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartamente();
        setDepartments(data);
        setActiveDepartment(data[0]); // Set the first department as active by default
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  if (!activeDepartment) {
    return null; // Display nothing while departments are loading
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2">
                {/* Display the Universitatea logo */}
                <Image
                  src={UNIVERSITATEA_LOGO_URL}
                  alt="Universitatea Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeDepartment.shortName}
                  </span>
                  <span className="truncate text-xs">
                    {activeDepartment.longName}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Departments
            </DropdownMenuLabel>
            {departments.map((department) => (
              <DropdownMenuItem
                key={department.idDepartament}
                onClick={() => setActiveDepartment(department)}
                className="gap-2 p-2"
              >
                <Image
                  src={UNIVERSITATEA_LOGO_URL}
                  alt="Universitatea Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md"
                />
                {department.shortName}
                <DropdownMenuShortcut>
                  {department.idDepartament}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Department
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
