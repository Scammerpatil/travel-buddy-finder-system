"use client";
import {
  IconCliffJumping,
  IconClock,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import NewLocation from "./NewLocation";

interface Location {
  name: string;
  location: string;
  description: string;
  image: string;
  category: string;
  bestTimeToVisit: string;
  activities: string[];
  coordinator: {
    name: string;
    email: string;
    phone: string;
  };
}

const AddSuggestedLocationPage = () => {
  const [location, setLocation] = useState([]);
  const fetchLocation = async () => {
    const res = await axios.get("/api/location");
    setLocation(res.data);
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold my-6 text-center uppercase text-primary">
        Hey Admin, Add a Suggested Location!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {location.map((location: Location, index: number) => (
          <div key={index} className="w-full">
            <LocationCard location={location} />
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-4 w-full"
        onClick={() => {
          (
            document.getElementById("addNewLocation") as HTMLDialogElement
          ).showModal();
        }}
      >
        Add New Location
      </button>
      <NewLocation />
    </>
  );
};

export default AddSuggestedLocationPage;

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <div className="card bg-base-300 w-full shadow-xl rounded-lg overflow-hidden">
      {/* Profile Image */}
      <figure>
        <img
          src={location.image}
          alt={location.name}
          className="h-52 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Name & Score */}
        <h2 className="card-title capitalize text-primary flex justify-between items-center">
          {location.name}
        </h2>

        {/* Bio */}
        <p className="text-base-content">
          {location.description || "No bio available"}
        </p>

        <div className="mt-3 space-y-1">
          <p className="flex items-center text-base-content/70">
            <IconUser className="w-5 h-5 mr-2 text-secondary" />{" "}
            {location.coordinator.name}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconMail className="w-5 h-5 mr-2 text-secondary" />{" "}
            {location.coordinator.email}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconPhone className="w-5 h-5 mr-2 text-secondary" />{" "}
            {location.coordinator.phone || "Not provided"}
          </p>
        </div>

        {/* Interests */}
        {location.activities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {location.activities.map((interest: string, index: number) => (
              <div key={index} className="badge badge-outline text-sm">
                {interest}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="card-actions mt-4 flex flex-row sm:flex-row gap-2">
          <p className="btn btn-primary w-full capitalize">
            <IconCliffJumping size={18} />
            {location.category}
          </p>
          <p className="btn btn-primary w-full capitalize">
            <IconClock size={18} />
            {location.bestTimeToVisit}
          </p>
        </div>
      </div>
    </div>
  );
};
