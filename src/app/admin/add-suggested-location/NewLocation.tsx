import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const NewLocation = () => {
  const [newLocation, setNewLocation] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    category: "",
    bestTimeToVisit: "",
    activities: "" || [],
    coordinator: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!newLocation.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: newLocation.name,
        folderName: "locations",
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setNewLocation({
            ...newLocation,
            image: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };
  const handleSubmit = () => {
    if (
      !newLocation.name ||
      !newLocation.location ||
      !newLocation.description ||
      !newLocation.image ||
      !newLocation.category ||
      !newLocation.bestTimeToVisit ||
      !newLocation.activities
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setNewLocation({
      ...newLocation,
      activities: newLocation.activities.split(","),
    });
    try {
      const res = axios.post("/api/location/addNewLocation", { newLocation });
      toast.promise(res, {
        loading: "Adding new location...",
        success: "New location added successfully",
        error: "Error adding new location",
      });
    } catch (error) {
      console.error("Error adding new location:", error);
      toast.error("Error adding new location");
    }
  };
  return (
    <dialog id="addNewLocation" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl uppercase text-center">
          Add New Location
        </h3>
        <div className="px-20 py-6 w-full space-y-4 bg-base-300 rounded-2xl border border-base-200 mt-6">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newLocation.name}
              onChange={(e) => {
                setNewLocation({ ...newLocation, name: e.target.value });
              }}
              placeholder="Enter location name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Location</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newLocation.location}
              placeholder="Enter Location"
              onChange={(e) => {
                setNewLocation({ ...newLocation, location: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea textarea-primary w-full"
              value={newLocation.description}
              placeholder="Enter Location Description"
              onChange={(e) => {
                setNewLocation({ ...newLocation, description: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Category</legend>
            <select
              value={newLocation.category}
              className="select select-primary select-bordered w-full"
              onChange={(e) => {
                setNewLocation({ ...newLocation, category: e.target.value });
              }}
            >
              <option value="">Select Category</option>
              {["beach", "mountain", "city", "desert", "forest"].map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Best Time To Visit</legend>
            <select
              value={newLocation.bestTimeToVisit}
              className="select select-primary select-bordered w-full"
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
                  bestTimeToVisit: e.target.value,
                });
              }}
            >
              <option value="">Select Best Time To Visit</option>
              {["summer", "winter", "spring", "autumn"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Activities</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newLocation.activities}
              placeholder="Enter Activities (comma separated)"
              onChange={(e) => {
                setNewLocation({ ...newLocation, activities: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Coordinator Name</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newLocation.coordinator.name}
              placeholder="Enter Coordinator Name"
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
                  coordinator: {
                    ...newLocation.coordinator,
                    name: e.target.value,
                  },
                });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Coordinator Email</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newLocation.coordinator.email}
              placeholder="Enter Coordinator Email"
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
                  coordinator: {
                    ...newLocation.coordinator,
                    email: e.target.value,
                  },
                });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Coordinator Name</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newLocation.coordinator.phone}
              placeholder="Enter Coordinator Phone"
              onChange={(e) => {
                setNewLocation({
                  ...newLocation,
                  coordinator: {
                    ...newLocation.coordinator,
                    phone: e.target.value,
                  },
                });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Location Image</legend>
            <input
              type="file"
              className="file-input file-input-primary w-full"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </fieldset>
        </div>
        <div className="modal-action justify-center">
          <form method="dialog" className="flex gap-4">
            <button
              className="btn btn-primary btn-outline"
              onClick={handleSubmit}
            >
              Add Location
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default NewLocation;
