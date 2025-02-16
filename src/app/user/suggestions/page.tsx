"use client";
import React from "react";

const TravelSuggestions = () => {
  const topLocations = [
    {
      id: 1,
      name: "Gateway of India",
      location: "Mumbai",
      description:
        "A historic monument and one of the most iconic landmarks of Mumbai, offering stunning sea views and cultural experiences.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Gateway_of_India_%28Mumbai%29.jpg",
    },
    {
      id: 2,
      name: "Marine Drive",
      location: "Mumbai",
      description:
        "A picturesque promenade along the Arabian Sea, famous for its sunset views and vibrant nightlife.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Marine_Drive_Mumbai.jpg",
    },
    {
      id: 3,
      name: "Ajanta & Ellora Caves",
      location: "Aurangabad",
      description:
        "UNESCO World Heritage Sites featuring stunning rock-cut caves, ancient paintings, and sculptures dating back to the 2nd century BCE.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Ajanta_caves_panorama.jpg",
    },
    {
      id: 4,
      name: "Mahabaleshwar",
      location: "Satara",
      description:
        "A popular hill station known for its scenic viewpoints, strawberry farms, and pleasant climate throughout the year.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d1/Mahabaleshwar_Sunset_Point.jpg",
    },
    {
      id: 5,
      name: "Lonavala & Khandala",
      location: "Pune",
      description:
        "Famous twin hill stations offering breathtaking waterfalls, forts, and lush green landscapes.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Lonavala_Bushi_Dam.jpg",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        Top Travel Destinations in Maharashtra
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {topLocations.map((location) => (
          <div className="card bg-base-300 w-80 shadow-xl" key={location.id}>
            <figure>
              <img
                src={location.image}
                alt={location.name}
                className="h-56 object-fill"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{location.name}</h2>
              <p>{location.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TravelSuggestions;
