import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconUsers,
  IconMap,
  IconMessage,
  IconSettings,
  IconHelpCircle,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Find Travel Buddies",
    path: "/user/matches",
    icon: <IconUsers width="24" height="24" />,
  },
  {
    title: "My Trips",
    path: "/user/my-trips",
    icon: <IconMap width="24" height="24" />,
  },
  {
    title: "Messages",
    path: "/user/messages",
    icon: <IconMessage width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/user/settings",
    icon: <IconSettings width="24" height="24" />,
  },
  {
    title: "Support",
    path: "/user/support",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
