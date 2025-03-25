"use client";

import { useEffect, useState } from "react";
import { Trip } from "@/types/Trip";
import { User } from "@/types/user";
import { Hotel } from "@/types/Hotel";
import { Car } from "@/types/Car";
import { Location } from "@/types/Location";
import axios from "axios";
import Link from "next/link";

const TripPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get("/api/trips");
      setTrips(response.data.trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase text-primary">
        Plan And Manage Your Trips
      </h1>

      {trips.length === 0 ? (
        <p className="text-lg text-base-content/80 text-center">
          You don't have any trips yet. Plan your first trip now!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, index) => (
            <TripCard key={index} trip={trip} />
          ))}
        </div>
      )}
      <div className="flex justify-center mb-6 absolute bottom-0 left-0 right-0">
        <Link href="my-trips/new" className="btn btn-primary">
          Plan a New Trip
        </Link>
      </div>
    </>
  );
};

const TripCard = ({ trip }: { trip: Trip }) => {
  return (
    <div className="card bg-base-300 shadow-lg p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-primary capitalize">
        {trip.type} Trip
      </h3>
      <p className="text-sm text-base-content/80">
        Destination: {trip.destination.name || "Not selected"}
      </p>
      <p className="text-sm text-base-content/80">
        Hotel: {trip.hotel?.hotelName || "Not selected"}
      </p>
      <p className="text-sm text-base-content/80">
        Car Service: {trip.carService?.companyName || "Not selected"}
      </p>
      <p className="text-sm text-base-content/80">
        Start Date: {new Date(trip.startDate).toDateString()}
      </p>
      <p className="text-sm text-base-content/80">
        End Date: {new Date(trip.endDate).toDateString()}
      </p>
      <p className="text-sm text-base-content/80">
        Members: {trip.members.map((member) => member.name).join(", ")}
      </p>
      {/* <div className="mt-4">
        <Link
          href={`/trip/details?id=${trip._id}`}
          className="btn btn-secondary"
        >
          View Details
        </Link>
      </div> */}
    </div>
  );
};

export default TripPage;
