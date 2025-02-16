"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";

const VehicleBookings = () => {
  const { user } = useUser();
  const rentalServices = [
    {
      id: 1,
      name: "Avis Rent a Car",
      location: "Mumbai",
      price: 2000,
      website: "https://www.avis.com/en/locations/in/mumbai",
      description:
        "Offers a wide range of vehicles with 24/7 service at Chhatrapati Shivaji International Airport.",
      image:
        "https://www.avislease.in/usedcarsale/upload/logo/Avis-Leasdate04032024.jpg",
    },
    {
      id: 2,
      name: "Zoomcar",
      location: "Mumbai",
      price: 1500,
      website: "https://www.zoomcar.com/in/mumbai",
      description:
        "Provides self-drive cars with flexible rental options and home delivery across Mumbai.",
      image:
        "https://play-lh.googleusercontent.com/K5uIwLq3_E7An0qmhdO_ihioJuYtbHAjORvC4YoHJYXXG7ySgKrJNJMP3WhxHriTbQ",
    },
    {
      id: 3,
      name: "Savaari",
      location: "Mumbai",
      price: 2500,
      website: "https://www.savaari.com/mumbai/car-rental",
      description:
        "Specializes in luxury and premium car rentals with chauffeur services.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwBqRWcEr0cHOyh3DmUFtngZ-GAEYWCQR7w&s",
    },
    {
      id: 4,
      name: "Revv",
      location: "Mumbai",
      price: 1800,
      website: "https://www.revv.co.in/car-rental/mumbai",
      description:
        "Offers a range of brand-new cars with home delivery and flexible rental periods.",
      image: "https://etimg.etb2bimg.com/photo/56755617.cms",
    },
    {
      id: 5,
      name: "Hype Luxury Mobility",
      location: "Mumbai",
      price: 5000,
      website: "https://www.gohype.in",
      description:
        "Provides luxury car, yacht, and private jet rentals for premium experiences.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a0/Hype_logo.png",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        Best Vehicle Rental Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {rentalServices.map((service) => (
          <div className="card bg-base-300 w-80 shadow-xl" key={service.id}>
            <figure>
              <img
                src={service.image}
                alt={service.name}
                className="h-56 object-fill"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              <p>{service.description}</p>
              <div className="card-actions justify-end">
                <a className="btn btn-primary" href={service.website}>
                  Visit Here!!
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VehicleBookings;
