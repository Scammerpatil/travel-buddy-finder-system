"use client";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import {
  LANGUAGES,
  MAHARASHTRA_DISTRICTS,
  MAHARASHTRA_TALUKAS,
  POPULAR_DESTINATION,
} from "@/utils/Constants";
import { IconCloudUpload, IconUpload } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { parse } from "path";
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
  interests: ["Food", "Nature", "Culture", "Nightlife", "Photography"],
  languages: LANGUAGES,
  destinations: [
    "Mountains",
    "Beaches",
    "Cities",
    "Forests",
    "Historical Sites",
  ],
  season: ["Summer", "Winter", "Monsoon", "All Year Round"],
  spontaneity: ["Spontaneous", "Planned", "Flexible"],
  connectWithOthers: ["Yes", "No"],
};

const Settings = () => {
  const { user } = useUser();
  if (!user) return null;
  console.log(user);
  return <Profile user={user} />;
};

export default Settings;

const Profile = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);

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
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData.name) {
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
        name: formData.name,
        folderName: "profileImages",
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            profileImage: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  return (
    <>
      <h1 className="text-xl font-semibold text-base-content sm:text-2xl">
        User settings
      </h1>
      <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4">
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-base-200 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                src={user.profileImage}
                alt={user.name}
              />
              <div>
                <h3 className="mb-1 text-xl font-bold text-base-content">
                  Profile picture
                </h3>
                <div className="mb-4 text-sm text-base-content/50">
                  JPG Max size of 800K
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="profileImageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                  <button
                    className="btn btn-primary flex items-center space-x-2"
                    onClick={() =>
                      document.getElementById("profileImageInput")?.click()
                    }
                  >
                    <IconCloudUpload size={20} />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-base-300 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold">Travel Preferences</h3>
            <div className="mb-4">
              <label
                htmlFor="budget"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Budget
              </label>
              <select
                value={formData.budget || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    budget: e.target.value,
                  });
                }}
                className="select select-bordered w-full text-base-content"
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
            <div className="mb-6">
              <label
                htmlFor="travelStyle"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Travel Style
              </label>
              <select
                value={formData.travelStyle || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    travelStyle: e.target.value,
                  });
                }}
                className="select select-primary select-bordered w-full text-base-content"
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
            <div className="mb-6">
              <label
                htmlFor="season"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Season
              </label>
              <select
                value={formData.season || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    season: e.target.value,
                  });
                }}
                className="select select-primary select-bordered w-full text-base-content"
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Season
                </option>
                {travelOptions.season.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="spontaneity"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Spontaneity
              </label>
              <select
                value={formData.spontaneity || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    spontaneity: e.target.value,
                  });
                }}
                className="select select-primary select-bordered w-full text-base-content"
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Spontaneity
                </option>
                {travelOptions.spontaneity.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="connectWithOthers"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Connection with Others
              </label>
              <select
                value={formData.connectWithOthers || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    connectWithOthers: e.target.value,
                  });
                }}
                className="select select-primary select-bordered w-full text-base-content"
                disabled={!isEditing}
                required
              >
                <option value="" disabled>
                  Select Connection with Others
                </option>
                {travelOptions.connectWithOthers.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="preferredCompanion"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Preferred Companion
              </label>
              <select
                value={formData.preferredCompanion || ""}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    preferredCompanion: e.target.value,
                  });
                }}
                className="select select-primary select-bordered w-full text-base-content"
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
            <div className="mb-6 flex flex-col mt-12">
              <label
                htmlFor="languages"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Languages
              </label>
              <div className="flex flex-row flex-wrap justify-center items-center gap-3">
                {LANGUAGES.map((option) => (
                  <label
                    key={option}
                    className="flex flex-row items-center justify-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData["languages"]?.includes(option)}
                      onChange={() => handleCheckboxChange("languages", option)}
                      className="checkbox checkbox-primary"
                      disabled={!isEditing}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6 mt-12">
              <label
                htmlFor="Destinations"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Destinations
              </label>
              <div className="flex flex-row flex-wrap justify-center items-center gap-3">
                {travelOptions.destinations.map((option) => (
                  <label
                    key={option}
                    className="flex flex-row items-center justify-center gap-2"
                  >
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
            <div className="mb-6 mt-9">
              <label
                htmlFor="interests"
                className="block mb-2 text-sm font-medium text-base-content"
              >
                Interests
              </label>
              <div className="flex flex-row flex-wrap justify-center gap-3">
                {travelOptions.interests.map((option) => (
                  <label
                    key={option}
                    className="flex flex-row items-center justify-center gap-2"
                  >
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
            <button
              className="btn btn-primary mt-4"
              onClick={handleSubmit}
              disabled={!isEditing}
            >
              Save All
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-8 mb-4 bg-base-300 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold text-base-content">
              General information
            </h3>
            <form>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    value={formData.name || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    disabled={!isEditing}
                    className="input input-primary w-full"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Mobile Number <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    value={formData.phone || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    disabled={!isEditing}
                    className="input input-primary w-full"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="mobileNumber"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Email <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    value={formData.email || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    disabled={!isEditing}
                    className="input input-primary w-full"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Gender <span className="text-error">*</span>
                  </label>
                  <select
                    value={formData.gender || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, gender: e.target.value });
                    }}
                    disabled={!isEditing}
                    className="select select-primary w-full"
                    required
                  >
                    <option value="" disabled>
                      Select Your Gender
                    </option>
                    <option value="Male" disabled>
                      Male
                    </option>
                    <option value="Female" disabled>
                      Female
                    </option>
                    <option value="Other" disabled>
                      Other
                    </option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Age <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        age: parseInt(e.target.value),
                      });
                    }}
                    disabled={!isEditing}
                    className="input input-primary w-full"
                    required
                  />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-3 mt-4">
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-base-content"
                >
                  Bio <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      bio: e.target.value,
                    });
                  }}
                  disabled={!isEditing}
                  className="textarea textarea-primary w-full"
                  required
                />
              </div>
            </form>
            <button
              className="btn btn-primary mt-4"
              onClick={handleSubmit}
              disabled={!isEditing}
            >
              Save All
            </button>
          </div>
          <div className="p-8 mb-4 bg-base-300 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold text-base-content">
              Address Details
            </h3>
            <form>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Street <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    value={formData.address?.street || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          street: e.target.value,
                        },
                      });
                    }}
                    disabled={!isEditing}
                    className="input input-primary w-full"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="district"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    District <span className="text-error">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.address?.district || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          district: e.target.value,
                        },
                      });
                    }}
                    className="select select-primary w-full text-base-content"
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
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="taluka"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Taluka <span className="text-error">*</span>
                  </label>
                  <select
                    id="taluka"
                    name="taluka"
                    value={formData.address?.taluka || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        address: {
                          ...formData.address,
                          taluka: e.target.value,
                        },
                      });
                    }}
                    className="select select-primary w-full text-base-content"
                    disabled={!isEditing}
                  >
                    <option value="" disabled>
                      Select District
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
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    State <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.address?.state || ""}
                    disabled
                    readOnly
                    className="input input-primary w-full input-bordered"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Country <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.address?.country || "India"}
                    disabled
                    readOnly
                    className="input input-primary w-full input-bordered"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={handleSubmit}
                disabled={!isEditing}
              >
                Save All
              </button>
            </form>
          </div>
          <div className="p-8 mb-4 bg-base-300 border border-base-content rounded-lg shadow-sm 2xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold text-base-content">
              Emergency Contact
            </h3>
            <form>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
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
                    disabled={!isEditing}
                    className="input input-primary w-full"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Relationship"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Relationship <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    id="Relationship"
                    name="Relationship"
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
                    className="input input-primary w-full text-base-content"
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-base-content"
                  >
                    Phone <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    id="Phone"
                    name="Phone"
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
                    className="input input-primary w-full text-base-content"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={handleSubmit}
                disabled={!isEditing}
              >
                Save All
              </button>
            </form>
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
