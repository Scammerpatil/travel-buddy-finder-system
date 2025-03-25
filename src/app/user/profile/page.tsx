"use client";
import { User } from "@/types/user";
import {
  IconAddressBook,
  IconBookmark,
  IconBriefcaseFilled,
  IconBuildingAirport,
  IconEdit,
  IconLanguage,
  IconMail,
  IconMapPin,
  IconMessage,
  IconMoneybag,
  IconPhone,
  IconStarFilled,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [user, setUser] = useState<User>();
  const [rating, setRating] = useState<number>();

  useEffect(() => {
    axios.get(`/api/user/getUser?id=${id}`).then((res) => {
      setUser(res.data.user);
      const ratingsArray = res.data.user.ratings || [];
      const totalRating = ratingsArray.length
        ? ratingsArray.reduce(
            (acc: number, rating: { rating: number }) => acc + rating.rating,
            0
          )
        : 0;
      setRating(ratingsArray.length ? totalRating / ratingsArray.length : 0);
    });
  }, [id]);

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-6 uppercase text-center">
        {user?.name}'s Profile
      </h1>
      <div className="max-w-4xl mx-auto my-10 p-6 bg-base-300 shadow-lg rounded-lg flex flex-col lg:flex-row items-center">
        {/* Profile Image */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <img
            src={user?.profileImage}
            alt="Profile"
            className="rounded-lg shadow-md w-48 h-48 object-cover"
          />
        </div>

        {/* User Info */}
        <div className="w-full lg:w-3/5 p-6 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-primary">{user?.name}</h1>
          <div className="w-4/5 mx-auto lg:mx-0 pt-3 border-b-2 border-success opacity-25"></div>

          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconAddressBook className="text-success" />
            {user?.address.street}, {user?.address.taluka},{" "}
            {user?.address.district}
          </p>

          <p className="pt-2 text-sm flex items-center justify-center lg:justify-start gap-2">
            <IconMapPin className="text-success" />
            Location: {user?.location?.coordinates[0]}° N,{" "}
            {user?.location?.coordinates[1]}° W
          </p>

          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconUsers className="text-success" />
            {user?.bio || "This user has not added a bio yet."}
          </p>

          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconPhone className="text-success" />
            {user?.phone}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconMail className="text-success" />
            {user?.email}
          </p>

          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconLanguage className="text-success" />
            {user?.languages?.join(", ") || "N/A"}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconBookmark className="text-success" />
            {user?.interests?.join(", ") || "N/A"}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconBuildingAirport className="text-success" />
            {user?.travelStyle || "N/A"}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconUsersGroup className="text-success" />
            {user?.preferredCompanion || "N/A"}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start gap-2">
            <IconMoneybag className="text-success" />
            {user?.budget || "N/A"}
          </p>
          {/* Ratings */}
          <div className="mt-6 bg-base-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-success">
              Ratings & Reviews
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled
                      key={i}
                      size={20}
                      className={
                        i < Math.round(rating || 0)
                          ? "text-warning"
                          : "text-base-content/40"
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-base-content/80">
                {rating ? `${rating.toFixed(1)} / 5` : "No ratings yet"}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {user?.ratings?.map((rating, index) => (
                <div
                  key={index}
                  className="bg-base-200 p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-semibold text-success">
                    {rating.user.name}
                  </h4>
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={rating.user.profileImage}
                        />
                      </div>
                    </div>
                    <div className="chat-bubble">
                      <div className="chat-content">
                        <p className="text-base-content/80">{rating.review}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IconStarFilled
                          key={i}
                          size={20}
                          className={
                            i < rating.rating
                              ? "text-warning"
                              : "text-base-content/40"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-base-content/80">
                      {rating.rating} / 5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 bg-base-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-success">
              Emergency Contact
            </h3>
            <p className="text-base text-base-content/80">
              Name: {user?.emergencyContact?.name || "N/A"}
            </p>
            <p className="text-base text-base-content/80">
              Phone: {user?.emergencyContact?.phone || "N/A"}
            </p>
            <p className="text-base text-base-content/80">
              Relationship: {user?.emergencyContact?.relationship || "N/A"}
            </p>
          </div>

          <div className="pt-6 flex flex-col lg:flex-row items-center gap-4">
            <Link
              href={`/user/chat?id=${user?._id}`}
              className="btn btn-success"
            >
              <IconMessage className="text-success-content" />
              Get In Touch
            </Link>
            {user?.location?.coordinates && (
              <Link
                href={`https://www.google.com/maps?q=${user.location.coordinates[1]},${user.location.coordinates[0]}`}
                target="_blank"
                className="btn btn-outline btn-primary flex items-center gap-2"
              >
                <IconMapPin size={20} /> View Location
              </Link>
            )}
          </div>
        </div>

        {/* Ratings */}
      </div>
    </>
  );
};

export default Profile;
