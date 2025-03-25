"use client";

import { useUser } from "@/context/UserContext";
import { Car } from "@/types/Car";
import { Hotel } from "@/types/Hotel";
import { Location } from "@/types/Location";
import { Trip } from "@/types/Trip";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const NewTrip = () => {
  const [destinations, setDestinations] = useState<Location[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [trip, setTrip] = useState({
    type: "",
    destination: "",
    hotel: "",
    carService: "",
    startDate: "",
    endDate: "",
    members: [],
  });
  const fetchOptions = async () => {
    try {
      const response = await axios.get("/api/trips/trip-options");
      console.log(response);
      setDestinations(response.data.destinations);
      setHotels(response.data.hotels);
      setCars(response.data.cars);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching trip options:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleCheckboxChange = (category: string, value: string) => {
    setTrip((prevData: Trip) => {
      const updatedList = prevData[category]?.includes(value)
        ? prevData[category].filter((item) => item !== value)
        : [...(prevData[category] || []), value];
      return { ...prevData, [category]: updatedList };
    });
  };

  const handleMakeTrip = async () => {
    try {
      const response = axios.post("/api/trips/plan-trip", { trip });
      toast.promise(response, {
        loading: "Creating Trip...",
        success: "Trip created successfully",
        error: "Error making trip",
      });
    } catch (error) {
      console.error("Error making trip:", error);
      toast.error("Error making trip");
    }
  };
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase text-primary">
        Plan a New Trip
      </h1>
      <div className="max-w-lg mx-auto border border-base-content p-4 rounded-lg">
        <div className="space-y-4 px-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">
                Choose Your Destination
              </span>
            </div>
            <select
              className="select select-bordered select-primary w-full"
              value={trip.destination}
              onChange={(e) =>
                setTrip({ ...trip, destination: e.target.value })
              }
            >
              <option value="">Select Destination</option>
              {destinations.map((destination: Location, index) => (
                <option key={index} value={destination._id}>
                  {destination.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">Choose Your Hotel</span>
            </div>
            <select
              className="select select-bordered select-primary w-full"
              value={trip.hotel}
              onChange={(e) => setTrip({ ...trip, hotel: e.target.value })}
            >
              <option value="">Select Hotel</option>
              {hotels.map((hotel: Hotel, index) => (
                <option key={index} value={hotel._id}>
                  {hotel.hotelName}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">
                Choose Your Car Service
              </span>
            </div>
            <select
              className="select select-bordered select-primary w-full"
              value={trip.carService}
              onChange={(e) => setTrip({ ...trip, carService: e.target.value })}
            >
              <option value="">Select Car Service</option>
              {cars.map((car: Car, index) => (
                <option key={index} value={car._id}>
                  {car.companyName}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">Start Date</span>
            </div>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={trip.startDate}
              onChange={(e) => {
                setTrip({ ...trip, startDate: e.target.value });
              }}
              className="input input-bordered input-primary w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">End Date</span>
            </div>
            <input
              type="date"
              min={trip.startDate}
              value={trip.endDate}
              onChange={(e) => {
                setTrip({ ...trip, endDate: e.target.value });
              }}
              className="input input-bordered input-primary w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base">Trip Type</span>
            </div>
            <select
              value={trip.type}
              onChange={(e) => {
                setTrip({ ...trip, type: e.target.value });
              }}
              className="input input-bordered input-primary w-full"
            >
              <option value="">Select Trip Type</option>
              <option value="solo">Solo</option>
              <option value="group">Group</option>
            </select>
          </label>
          {trip.type === "group" && (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-base">Choose Members</span>
              </div>
              <div className="flex flex-row flex-wrap justify-around gap-3">
                {users.map((user) => (
                  <label
                    key={user._id}
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={trip["members"]?.includes(user._id)}
                      onChange={() => handleCheckboxChange("members", user._id)}
                      className="checkbox checkbox-primary"
                    />
                    <span>{user.name}</span>
                  </label>
                ))}
              </div>
            </label>
          )}
          <button className="btn btn-primary w-full" onClick={handleMakeTrip}>
            Plan Trip
          </button>
        </div>
      </div>
    </>
  );
};
export default NewTrip;
