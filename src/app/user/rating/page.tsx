"use client";
import { User } from "@/types/user";
import {
  IconFileIsr,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddRating = () => {
  const [matches, setMatches] = useState<User[]>([]);

  const fetchMatches = async () => {
    try {
      const response = await axios.get("/api/user");
      console.log("API Response:", response.data); // Debugging
      setMatches(response.data.matches || []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase text-primary">
        Give Rating to your Travel Buddy!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {matches.length > 0 ? (
          matches.map((match: User, index: number) => (
            <UserCard key={match._id || index} user={match} />
          ))
        ) : (
          <p className="text-center col-span-full text-base-content/60">
            No matches found.
          </p>
        )}
      </div>
    </>
  );
};

export default AddRating;

const UserCard = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false); // Control modal visibility

  return (
    <div className="card bg-base-300 w-full shadow-xl rounded-lg overflow-hidden">
      {/* Profile Image */}
      <figure>
        <img
          src={user.profileImage || "/default-avatar.png"} // Default fallback
          alt={user.name || "User"}
          className="h-52 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Name & Score */}
        <h2 className="card-title capitalize text-primary flex justify-between items-center">
          {user.name || "Unknown User"}
        </h2>

        {/* Bio */}
        <p className="text-base-content">{user.bio || "No bio available"}</p>

        <div className="mt-3 space-y-1">
          <p className="flex items-center text-base-content/70">
            <IconMail className="w-5 h-5 mr-2 text-secondary" />
            {user.email || "Not provided"}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconPhone className="w-5 h-5 mr-2 text-secondary" />
            {user.phone || "Not provided"}
          </p>
        </div>

        {/* Interests */}
        {user?.interests?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.interests.map((interest, index) => (
              <span key={index} className="badge badge-secondary capitalize">
                {interest}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="card-actions mt-4 flex flex-row sm:flex-row gap-2">
          <a
            className="btn btn-primary w-full capitalize"
            href={`/user/profile?id=${user._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconUser size={18} />
            View Profile
          </a>
          <button
            className="btn btn-primary w-full capitalize"
            onClick={() => setIsOpen(true)} // Open modal
          >
            <IconFileIsr size={18} />
            Add Rating
          </button>
        </div>
      </div>

      {isOpen && (
        <AddRatingDialog anotheruser={user} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

const AddRatingDialog = ({
  anotheruser,
  onClose,
}: {
  anotheruser: User;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState({
    rating: 0,
    review: "",
  });

  const handleSubmit = async () => {
    try {
      const res = axios.post("/api/rating/addRating", { rating, anotheruser });
      toast.promise(res, {
        loading: "Adding rating...",
        success: "Rating added successfully",
        error: "Error adding rating",
      });
      onClose();
    } catch (error) {
      console.error("Error adding rating:", error);
      toast.error("Error adding rating");
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-2xl uppercase text-center">
          Give a Rating to {anotheruser.name}
        </h3>
        <div className="px-20 py-6 w-full space-y-4 bg-base-300 rounded-2xl border border-base-200 mt-6">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Rating</legend>
            <input
              type="number"
              className="input input-primary w-full"
              value={rating.rating}
              min={1}
              max={5}
              onChange={(e) =>
                setRating({ ...rating, rating: parseInt(e.target.value) })
              }
              placeholder="Enter Rating (1-5)"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Review</legend>
            <textarea
              className="textarea textarea-primary w-full"
              value={rating.review}
              onChange={(e) => setRating({ ...rating, review: e.target.value })}
              placeholder="Enter Review"
            />
          </fieldset>
        </div>
        <div className="modal-action justify-center">
          <button
            className="btn btn-primary btn-outline"
            onClick={handleSubmit}
          >
            Add Rating
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};
