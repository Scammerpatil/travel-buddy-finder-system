"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import {
  IconUsers,
  IconMap,
  IconMessage,
  IconSettings,
  IconHelpCircle,
} from "@tabler/icons-react";

const UserDashboardPage = () => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="w-full flex items-center justify-center flex-col gap-4">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Welcome, {user?.fullName}!
      </h1>
      <div className="flex flex-row flex-wrap gap-4 items-center justify-center">
        <DashboardCard
          title="Find Travel Buddies"
          icon={<IconUsers />}
          path="/user/matches"
        />
        <DashboardCard title="My Trips" icon={<IconMap />} path="/my-trips" />
        <DashboardCard
          title="Messages"
          icon={<IconMessage />}
          path="/user/messages"
        />
        <DashboardCard
          title="Settings"
          icon={<IconSettings />}
          path="/user/settings"
        />
        <DashboardCard
          title="Support"
          icon={<IconHelpCircle />}
          path="/user/support"
        />
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  icon,
  path,
}: {
  title: string;
  path: string;
  icon: React.ReactNode;
}) => {
  return (
    <a
      href={path}
      className="card bg-base-300 w-1/3 shadow-lg p-4 flex items-center space-x-4 hover:bg-primary hover:text-primary-content transition"
    >
      <span className="text-3xl">{icon}</span>
      <h2 className="text-lg font-semibold">{title}</h2>
    </a>
  );
};

export default UserDashboardPage;
