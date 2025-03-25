import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

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

const NewCarDealer = () => {
  const [newDealer, setNewDealer] = useState({
    companyName: "Car Rental Services",
    email: "",
    contact: "",
    name: "",
    location: "",
    price: 0,
    website: "",
    description: "",
    image: "",
  });
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!newDealer.name) {
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
        name: newDealer.companyName,
        folderName: "car-dealers",
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setNewDealer({
            ...newDealer,
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
      !newDealer.name ||
      !newDealer.location ||
      !newDealer.description ||
      !newDealer.image ||
      !newDealer.price ||
      !newDealer.website ||
      !newDealer.contact ||
      !newDealer.companyName
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = axios.post("/api/cars/addCarDealer", { newDealer });
      toast.promise(res, {
        loading: "Adding new Car...",
        success: "New Car added successfully",
        error: "Error adding new car",
      });
    } catch (error) {
      console.error("Error adding new car:", error);
      toast.error("Error adding new car");
    }
  };
  return (
    <dialog id="addNewCar" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl uppercase text-center">
          Add New Car
        </h3>
        <div className="px-20 py-6 w-full space-y-4 bg-base-300 rounded-2xl border border-base-200 mt-6">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newDealer.name}
              onChange={(e) => {
                setNewDealer({ ...newDealer, name: e.target.value });
              }}
              placeholder="Enter Car Dealer Company Owner Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Phone</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newDealer.contact}
              onChange={(e) => {
                setNewDealer({ ...newDealer, contact: e.target.value });
              }}
              placeholder="Enter Car Dealer Company Owner Phone"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input input-primary w-full"
              value={newDealer.email}
              onChange={(e) => {
                setNewDealer({ ...newDealer, email: e.target.value });
              }}
              placeholder="Enter Car Dealer Company Owner Email"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Location</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newDealer.location}
              placeholder="Enter Location"
              onChange={(e) => {
                setNewDealer({ ...newDealer, location: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea textarea-primary w-full"
              value={newDealer.description}
              placeholder="Enter Location Description"
              onChange={(e) => {
                setNewDealer({ ...newDealer, description: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Car Dealer Company Name</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newDealer.companyName}
              placeholder="Enter Car Dealer Company Name"
              onChange={(e) => {
                setNewDealer({ ...newDealer, companyName: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Price</legend>
            <input
              type="number"
              value={newDealer.price}
              className="select select-primary select-bordered w-full"
              onChange={(e) => {
                setNewDealer({ ...newDealer, price: parseInt(e.target.value) });
              }}
              placeholder="Enter Price"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Website</legend>
            <input
              type="text"
              className="input input-primary w-full"
              value={newDealer.website}
              placeholder="Enter Hotel Website"
              onChange={(e) => {
                setNewDealer({ ...newDealer, website: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Car Dealer Image</legend>
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
              Add Car
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default NewCarDealer;
