"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import {
  IconUsers,
  IconMap,
  IconCalendar,
  IconCar,
  IconBuilding,
} from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Trip } from "@/types/Trip";

const UserDashboardPage = () => {
  const { user } = useUser();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [stats, setStats] = useState({
    destinations: 0,
  });

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user?._id) return;
      const res = await axios.get(`/api/trips`);
      setTrips(res.data.trips);
      const uniqueDestinations = new Set(
        res.data.trips.map(
          (trip: Trip) => trip.destination?.name || trip.destination
        )
      );

      setStats({
        destinations: uniqueDestinations.size,
      });
    };
    fetchTrips();
  }, [user]);

  if (!user) return null;

  const chartData =
    trips.length !== 0 &&
    trips.map((trip) => ({
      name: new Date(trip.startDate).toLocaleDateString(),
      members: trip.members.length,
    }));

  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase text-primary mb-10">
        Welcome, {user?.name}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-base-300">
        <div className="stats shadow bg-base-300">
          <div className="stat">
            <div className="stat-figure text-primary">
              <IconCalendar size={32} />
            </div>
            <div className="stat-title">Total Trips</div>
            <div className="stat-value text-primary">{trips.length}</div>
          </div>
        </div>

        <div className="stats shadow bg-base-300">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <IconUsers size={32} />
            </div>
            <div className="stat-title">Total Members Joined</div>
            <div className="stat-value text-secondary">
              {trips.reduce(
                (sum, trip) => sum + (trip.members?.length || 0),
                0
              )}
            </div>
          </div>
        </div>

        <div className="stats shadow bg-base-300">
          <div className="stat">
            <div className="stat-figure text-accent">
              <IconMap size={32} />
            </div>
            <div className="stat-title">Unique Destinations</div>
            <div className="stat-value text-accent">{stats.destinations}</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-base-300 p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-5 text-base-content">
          Members Joined Over Trips
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="members" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Trips */}
      <div className="mt-10 bg-base-300 p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-5 text-base-content">
          Upcoming Trips
        </h2>
        {trips.length === 0 ? (
          <p>No trips planned yet.</p>
        ) : (
          <ul className="space-y-4">
            {trips.map((trip) => (
              <li
                key={trip._id}
                className="border border-base-300 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {trip.destination.name || "Unnamed Destination"}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      {new Date(trip.startDate).toDateString()} -{" "}
                      {new Date(trip.endDate).toDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {trip.hotel && (
                      <IconBuilding size={24} title="Hotel Booked" />
                    )}
                    {trip.carService && (
                      <IconCar size={24} title="Car Booked" />
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UserDashboardPage;
