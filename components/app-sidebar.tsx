/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "USV",
    email: "usv.ro",
    avatar: "/avatars/shadcn.jpg",
  },
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
      items: [
        {
          title: "Examenele Mele",
          url: "/examenele-mele",
        },
        {
          title: "Cereri",
          url: "/cereri",
        },
        {
          title: "Cereri Profesor",
          url: "/teacher-cereri",
        },
      ],
    },
    {
      title: "Examene",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Statistici",
          url: "/statistici",
        },
        {
          title: "Chestionar",
          url: "/chestionar",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Sali",
      url: "/manage-sali",
      icon: BookOpen,
      items: [
        {
          title: "Sali Examene",
          url: "/manage-examen-sali",
        },
        {
          title: "Sali",
          url: "/manage-sali",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
