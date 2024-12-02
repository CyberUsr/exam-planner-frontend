/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  LucideIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  roles?: string[]; // Add roles property for filtering
  items?: NavItem[];
}

interface Team {
  name: string;
  logo: LucideIcon;
  plan: string;
}

const baseData = {
  teams: [
    {
      name: "Exam Planner",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "FIESC",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "FIMAR",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Studenti",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      roles: ["Student", "Secretariat", "Admin"],
      items: [
        {
          title: "Examenele Mele",
          url: "/examenele-mele",
        },
        {
          title: "Examenele by Dificultate",
          url: "/examene-by-dificulty",
        },
        {
          title: "Examenene All",
          url: "/examene-all",
        },
        {
          title: "Cereri",
          url: "/cereri",
        },
        {
          title: "Adaugare Studenti",
          url: "/adaugare-studenti",
          roles: ["Secretariat"],
        },
        {
          title: "Vizualizare Studenti",
          url: "/view-studenti",
          roles: ["Secretariat"],
        },
      ],
    },

    {
      title: "Chestionar",
      url: "#",
      icon: Bot,
      roles: ["Student"],
      items: [
        {
          title: "Chestionar Examene",
          url: "/chestionar",
        },
      ],
    },
    {
      title: "Examene",
      url: "#",
      icon: Bot,
      roles: ["Profesor", "Admin", "Secretariat"],
      items: [
        {
          title: "Statistici",
          url: "/statistici",
        },
        {
          title: "Adauga Examene",
          url: "/adaugare-examene",
          roles: ["Profesor", "Secretariat"],
        },
        {
          title: "Chestionar",
          url: "/chestionar",
          roles: ["Profesor", "Studenti"],
        },
        {
          title: "Cereri Profesor",
          url: "/teacher-cereri",
          roles: ["Profesor"],
        },
        {
          title: "Manage Examene",
          url: "/dashboard/professor/manage-exams",
          roles: ["Profesor"],
        },
      ],
    },
    {
      title: "Profesori",
      url: "/manage-sali",
      icon: BookOpen,
      roles: ["Secretariat"],
      items: [
        {
          title: "Adauga Profesori",
          url: "/adaugare-profesori",
        },
        {
          title: "Vizualizare Profesori",
          url: "/view-profesori",
        },
      ],
    },
    {
      title: "Sali",
      url: "/manage-sali",
      icon: BookOpen,
      roles: ["Secretariat", "Admin"],
      items: [
        {
          title: "Sali Examene",
          url: "/manage-examen-sali",
        },
        {
          title: "Sali",
          url: "/manage-sali",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      roles: ["Admin"],
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = React.useState<string>(""); // Fetch user role dynamically

  // Simulate fetching user role from localStorage or API
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role); // Assuming the role is stored in user data
    }
  }, []);

  const filterNavItems = (navItems: NavItem[]): NavItem[] => {
    return navItems
      .filter((item) => !item.roles || item.roles.includes(userRole)) // Only include items the user has access to
      .map((item) => ({
        ...item,
        items: item.items ? filterNavItems(item.items) : undefined, // Recursively filter sub-items
      }));
  };

  const filteredNavMain = filterNavItems(baseData.navMain);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
