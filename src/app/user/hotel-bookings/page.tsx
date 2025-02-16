"use client";
import React from "react";

const HotelBookings = () => {
  const hotelServices = [
    {
      id: 1,
      name: "Taj Mahal Palace",
      location: "Mumbai",
      price: 12000,
      website: "https://www.tajhotels.com/en-in/taj/taj-mahal-palace-mumbai/",
      description:
        "Luxury heritage hotel offering world-class hospitality with breathtaking views of the Gateway of India.",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232408967.jpg?k=a9b0db5d6a274c80176edfffa5c5bbd3c0ef38358e6cf29a529b1ea25e9aefcd&o=&hp=1",
    },
    {
      id: 2,
      name: "The Oberoi",
      location: "Mumbai",
      price: 15000,
      website: "https://www.oberoihotels.com/hotels-in-mumbai/",
      description:
        "A 5-star hotel with luxurious rooms, fine dining, and a beautiful sea-facing location in Nariman Point.",
      image:
        "https://www.oberoihotels.com/-/media/oberoi-hotels/mumbai/gallery/hotel/the-oberoi-mumbai-hotel-overview.jpg",
    },
    {
      id: 3,
      name: "ITC Maratha",
      location: "Mumbai",
      price: 10000,
      website: "https://www.itchotels.com/in/en/itcmaratha-mumbai",
      description:
        "Elegant hotel with grand architecture, top-notch amenities, and exceptional dining experiences.",
      image:
        "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcgrandmaratha-mumbai/images/overview/overview-ITCMaratha-1366x768.jpg",
    },
    {
      id: 4,
      name: "JW Marriott",
      location: "Mumbai",
      price: 14000,
      website:
        "https://www.marriott.com/en-us/hotels/bomjw-jw-marriott-mumbai-juhu/overview/",
      description:
        "Premium beachside hotel offering a blend of elegance, comfort, and incredible dining options.",
      image:
        "https://cache.marriott.com/marriottassets/marriott/BOMJW/bomjw-exterior-0026-hor-feat.jpg?interpolation=progressive-bilinear&",
    },
    {
      id: 5,
      name: "Trident Nariman Point",
      location: "Mumbai",
      price: 11000,
      website: "https://www.tridenthotels.com/hotels-in-mumbai-nariman-point",
      description:
        "A luxurious seafront hotel with modern amenities, multiple restaurants, and a stunning infinity pool.",
      image:
        "https://www.tridenthotels.com/images/site-specific/mumbai-nariman-point/trident-nariman-point-mumbai-exterior-view.jpg",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        Best Hotel Booking Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {hotelServices.map((hotel) => (
          <div className="card bg-base-300 w-80 shadow-xl" key={hotel.id}>
            <figure>
              <img
                src={hotel.image}
                alt={hotel.name}
                className="h-56 object-fill"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{hotel.name}</h2>
              <p>{hotel.description}</p>
              <div className="card-actions justify-end">
                <a
                  className="btn btn-primary"
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HotelBookings;
