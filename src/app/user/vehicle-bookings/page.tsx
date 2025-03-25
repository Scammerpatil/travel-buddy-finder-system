"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import {
  IconMail,
  IconMap,
  IconPhone,
  IconUser,
  IconWorldWww,
} from "@tabler/icons-react";

interface Car {
  companyName: string;
  email: string;
  contact: string;
  name: string;
  location: string;
  price: number;
  website: string;
  description: string;
  image: string;
}

const VehicleBookings = () => {
  const { user } = useUser();
  const [cars, setCars] = useState<Car[]>([]);
  const fetchCars = async () => {
    const response = await fetch("/api/cars");
    const data = await response.json();
    setCars(data);
  };
  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <>
      <h1 className="text-4xl uppercase font-bold text-primary mb-4 text-center">
        Best Vehicle Rental Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {cars.map((car: Car, index: number) => (
          <div key={index} className="w-full">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </>
  );
};

export default VehicleBookings;

const CarCard = ({ car }: { car: Car }) => {
  return (
    <div className="card bg-base-300 w-full shadow-xl rounded-lg overflow-hidden">
      {/* Profile Image */}
      <figure>
        <img
          src={car.image}
          alt={car.name}
          className="h-52 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Name & Score */}
        <h2 className="card-title capitalize text-primary flex justify-between items-center">
          {car.companyName}
        </h2>

        {/* Bio */}
        <p className="text-base-content">
          {car.description || "No bio available"}
        </p>

        <div className="mt-3 space-y-1">
          <p className="flex items-center text-base-content/70">
            <IconUser className="w-5 h-5 mr-2 text-secondary" /> {car.name}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconMail className="w-5 h-5 mr-2 text-secondary" />{" "}
            {car.email || "Not provided"}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconPhone className="w-5 h-5 mr-2 text-secondary" />{" "}
            {car.contact || "Not provided"}
          </p>
        </div>

        {/* Interests */}

        <div className="mt-3 flex flex-wrap gap-2">
          <div className="badge badge-outline text-sm">{car.price} INR</div>
        </div>

        {/* Actions */}
        <div className="card-actions mt-4 flex flex-row sm:flex-row gap-2">
          <a
            className="btn btn-primary w-full capitalize"
            href={car.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWorldWww size={18} />
            Visit Website
          </a>
          <p className="btn btn-primary w-full capitalize">
            <IconMap size={18} />
            {car.location}
          </p>
        </div>
      </div>
    </div>
  );
};
