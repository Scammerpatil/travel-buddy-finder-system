"use client";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import {
  LANGUAGES,
  MAHARASHTRA_DISTRICTS,
  MAHARASHTRA_TALUKAS,
  POPULAR_DESTINATION,
} from "@/utils/Constants";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const travelOptions = {
  budget: ["Low", "Medium", "High"],
  travelStyle: ["Backpacking", "Luxury", "Adventure", "Cultural"],
  preferredCompanion: [
    "Anyone",
    "Solo",
    "Same Gender",
    "Small Group",
    "Large Group",
  ],
  interests: ["Hiking", "Beaches", "Food", "Culture", "Photography"],
  languages: LANGUAGES,
  destinations: POPULAR_DESTINATION,
};

const Settings = () => {
  const { user } = useUser();
  if (!user) return null;
  return <Profile user={user} />;
};

export default Settings;

const Profile = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    formData.profileImage || "/default-profile.png"
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.age) {
      alert("Please fill in all required fields");
      return;
    }
    const response = axios.patch("/api/user/update", { formData });
    toast.promise(response, {
      loading: "Updating User...",
      success: "User Update Successfully",
      error: "Something went wrong",
    });
    setIsEditing(false);
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setFormData((prevData: User) => {
      const updatedList = prevData[category]?.includes(value)
        ? prevData[category].filter((item) => item !== value)
        : [...(prevData[category] || []), value];
      return { ...prevData, [category]: updatedList };
    });
  };

  return (
    <>
      {/* Profile Image */}
      <div className="my-6">
        <div className="flex items-center gap-4">
          <img
            src={imagePreview}
            alt="Profile Pic"
            className="rounded-full h-40 w-40 object-cover border border-primary"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered"
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Personal Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
        <hr className="mb-4" />
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
            {/* Name */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Full Name"
                disabled={!isEditing}
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Mobile Number"
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={formData.email || ""}
                readOnly
                className="input input-bordered w-full text-base-content"
                placeholder="Mobile Number"
                disabled
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="gender"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={formData.gender || ""}
                readOnly
                className="input input-bordered w-full text-base-content"
                placeholder="Gender"
                disabled
              />
            </div>
            {/* Age */}
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">Age</label>
              <input
                type="number"
                value={formData.age || ""}
                onChange={(e) => {
                  setFormData({ ...formData, age: parseInt(e.target.value) });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Age"
                disabled={!isEditing}
                min={15}
                max={80}
                required
              />
            </div>
          </div>
          {/* Bio */}
          <div className="flex flex-col mt-4">
            <label className="text-base-content font-medium mb-1" htmlFor="bio">
              Bio
            </label>
            <textarea
              value={formData.bio || ""}
              onChange={(e) => {
                setFormData({ ...formData, bio: e.target.value });
              }}
              className="textarea textarea-bordered w-full text-base-content"
              placeholder="Tell something about yourself..."
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Address Details</h2>
        <hr className="mb-4" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
            {/* Street */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Street <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.address?.street || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Your Street"
                disabled={!isEditing}
                required
              />
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="mobileNumber"
              >
                District
              </label>
              <select
                value={formData.address?.district || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: { ...formData.address, district: e.target.value },
                  });
                }}
                className="input input-bordered w-full text-base-content"
                disabled={!isEditing}
              >
                <option value="" disabled>
                  Select District
                </option>
                {MAHARASHTRA_DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="mobileNumber"
              >
                Taluka
              </label>
              <select
                value={formData.address?.taluka || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    address: { ...formData.address, taluka: e.target.value },
                  });
                }}
                className="input input-bordered w-full text-base-content"
                disabled={!isEditing}
              >
                <option value="" disabled>
                  Select Taluka
                </option>
                {formData.address?.district &&
                  MAHARASHTRA_TALUKAS[formData.address.district].map(
                    (taluka, idx) => (
                      <option key={idx} value={taluka}>
                        {taluka}
                      </option>
                    )
                  )}
              </select>
            </div>

            {/* State */}
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.address?.state || "Maharashtra"}
                className="input input-bordered w-full text-base-content"
                placeholder="Mobile Number"
                disabled
              />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">
                Country
              </label>
              <input
                type="text"
                value={formData.address?.country || "India"}
                readOnly
                className="input input-bordered w-full text-base-content"
                placeholder="Gender"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Prefereces */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Travel Preferences</h2>
        <hr className="mb-4" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Budget <span className="text-error">*</span>
              </label>
              <select
                value={formData.budget || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    budget: e.target.value,
                  });
                }}
                className="input input-bordered w-full text-base-content"
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Budget
                </option>
                {travelOptions.budget.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Travel Style <span className="text-error">*</span>
              </label>
              <select
                value={formData.travelStyle || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    travelStyle: e.target.value,
                  });
                }}
                className="input input-bordered w-full text-base-content"
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Travel Style
                </option>
                {travelOptions.travelStyle.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">
                Preferred Companion <span className="text-error">*</span>
              </label>
              <select
                value={formData.preferredCompanion || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    preferredCompanion: e.target.value,
                  });
                }}
                className="input input-bordered w-full text-base-content"
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Preferred Companion
                </option>
                {travelOptions.preferredCompanion.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1 ">
                Languages <span className="text-error">*</span>
                <div className="flex flex-row items-center space-x-2 flex-wrap">
                  {LANGUAGES.map((option) => (
                    <label
                      key={option}
                      className="flex flex-row items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData["languages"]?.includes(option)}
                        onChange={() =>
                          handleCheckboxChange("languages", option)
                        }
                        className="checkbox checkbox-primary"
                        disabled={!isEditing}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </label>
            </div>
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Interests <span className="text-error">*</span>
              </label>
              <div className="flex flex-row items-center space-x-2 flex-wrap">
                {travelOptions.interests.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData["interests"]?.includes(option)}
                      onChange={() => handleCheckboxChange("interests", option)}
                      className="checkbox checkbox-primary"
                      disabled={!isEditing}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label
                className="text-base-content font-medium mb-1"
                htmlFor="fullName"
              >
                Destinations <span className="text-error">*</span>
              </label>
              <div className="flex flex-row items-center space-x-2 flex-wrap">
                {travelOptions.destinations.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData["destinations"]?.includes(option)}
                      onChange={() =>
                        handleCheckboxChange("destinations", option)
                      }
                      className="checkbox checkbox-primary"
                      disabled={!isEditing}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
        <hr className="mb-4" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">
                Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.emergencyContact?.name || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      name: e.target.value,
                      phone: formData.emergencyContact?.phone || "",
                      relationship:
                        formData.emergencyContact?.relationship || "",
                    },
                  });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Emergency Contact Name"
                disabled={!isEditing}
                required
              />
            </div>
            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">
                Phone <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.emergencyContact?.phone || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      name: formData.emergencyContact?.name || "",
                      phone: e.target.value,
                      relationship:
                        formData.emergencyContact?.relationship || "",
                    },
                  });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Emergency Contact Phone"
                disabled={!isEditing}
                required
              />
            </div>
            {/* Relationship */}
            <div className="flex flex-col">
              <label className="text-base-content font-medium mb-1">
                Relationship <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.emergencyContact?.relationship || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      name: formData.emergencyContact?.name || "",
                      phone: formData.emergencyContact?.phone || "",
                      relationship: e.target.value,
                    },
                  });
                }}
                className="input input-bordered w-full text-base-content"
                placeholder="Emergency Contact Relationship"
                disabled={!isEditing}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full flex items-center justify-center">
        <button
          className="btn btn-primary btn-outline w-5/6 mx-auto"
          onClick={() => {
            setIsEditing(!isEditing);
            if (isEditing) handleSubmit();
          }}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
    </>
  );
};
