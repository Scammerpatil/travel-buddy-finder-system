import { SideNavItem } from "@/types/types";
import {
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconCar,
  IconMap,
  IconMapPin,
  IconUserShield,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Admin Dashboard",
    path: "/admin/dashboard",
    icon: <IconUserShield width="24" height="24" />,
  },
  {
    title: "Add Hotel Dealer",
    path: "/admin/add-hotel-dealer",
    icon: <IconBuildingStore width="24" height="24" />,
  },
  {
    title: "Add Car Dealer",
    path: "/admin/add-car-dealer",
    icon: <IconCar width="24" height="24" />,
  },
  {
    title: "Add Suggested Location",
    path: "/admin/add-suggested-location",
    icon: <IconMapPin width="24" height="24" />,
  },
];
