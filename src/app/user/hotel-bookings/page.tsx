"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IconMail,
  IconMap,
  IconPhone,
  IconUser,
  IconWorldWww,
} from "@tabler/icons-react";
interface Hotel {
  name: string;
  location: string;
  price: number;
  website: string;
  description: string;
  image: string;
  email: string;
  contact: string;
  hotelName: string;
}

const HotelBookings = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const fetchHotels = async () => {
    const res = await axios.get("/api/hotels");
    setHotels(res.data);
  };
  useEffect(() => {
    fetchHotels();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        Best Hotel Booking Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {hotels.map((hotel: Hotel, index: number) => (
          <div key={index} className="w-full">
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HotelBookings;

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <div className="card bg-base-300 w-full shadow-xl rounded-lg overflow-hidden">
      {/* Profile Image */}
      <figure>
        <img
          src={hotel.image}
          alt={hotel.name}
          className="h-52 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Name & Score */}
        <h2 className="card-title capitalize text-primary flex justify-between items-center">
          {hotel.hotelName}
        </h2>

        {/* Bio */}
        <p className="text-base-content">
          {hotel.description || "No bio available"}
        </p>

        <div className="mt-3 space-y-1">
          <p className="flex items-center text-base-content/70">
            <IconUser className="w-5 h-5 mr-2 text-secondary" /> {hotel.name}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconMail className="w-5 h-5 mr-2 text-secondary" />{" "}
            {hotel.email || "Not provided"}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconPhone className="w-5 h-5 mr-2 text-secondary" />{" "}
            {hotel.contact || "Not provided"}
          </p>
        </div>

        {/* Interests */}

        <div className="mt-3 flex flex-wrap gap-2">
          <div className="badge badge-outline text-sm">{hotel.price} INR</div>
        </div>

        {/* Actions */}
        <div className="card-actions mt-4 flex flex-row sm:flex-row gap-2">
          <a
            className="btn btn-primary w-full capitalize"
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWorldWww size={18} />
            Visit Website
          </a>
          <p className="btn btn-primary w-full capitalize">
            <IconMap size={18} />
            {hotel.location}
          </p>
        </div>
      </div>
    </div>
  );
};
