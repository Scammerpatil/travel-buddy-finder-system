"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconSearch,
  IconStarFilled,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { User } from "@/types/user";

const MatchesPage = () => {
  const { user } = useUser();
  const [data, setData] = useState("");
  const [matches, setMatches] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [filteredMatches, setFilteredMatches] = useState<User[]>([]);

  useEffect(() => {
    if (user?.destinations?.length === 0 || user?.interests?.length === 0) {
      setData("Fill All Your Basic Details!!");
    }
    fetchMatches();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query, matches]);

  const fetchMatches = async () => {
    try {
      const matchedUsers = await axios.get("/api/user/getMatches");
      setMatches(matchedUsers.data.matches);
      setFilteredMatches(matchedUsers.data.matches);
    } catch (error) {
      console.error("Error finding matches:", error);
    }
  };

  const handleSearch = () => {
    if (!query) {
      setFilteredMatches(matches);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = matches.filter((match: any) => {
      return (
        match.user.name.toLowerCase().includes(lowerQuery) ||
        match.user.interests.some((interest: string) =>
          interest.toLowerCase().includes(lowerQuery)
        ) ||
        match.user.location.city?.toLowerCase().includes(lowerQuery) ||
        match.user.location.state?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredMatches(filtered);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase text-primary">
        Find Your Travel Buddy
      </h1>
      <label className="input input-primary input-bordered flex items-center gap-2">
        <IconSearch size={20} />
        <input
          type="text"
          className="grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search User....(By Name, Interest, Location)"
        />
      </label>
      {data && (
        <div className="w-full bg-base-200 p-4 rounded-lg shadow-lg">
          <p className="text-center text-3xl uppercase font-semibold flex items-center justify-center">
            {data}
          </p>
          <Link href="/user/settings" className="mt-10 btn btn-primary w-full">
            Go and fill the details
          </Link>
        </div>
      )}
      {!data && filteredMatches.length !== 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredMatches.map((match: User, index: number) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      )}
    </>
  );
};

const MatchCard = ({ match }: { match: any }) => {
  const { user, score } = match;
  const googleMapsLink = `https://www.google.com/maps?q=${user.location.coordinates[1]},${user.location.coordinates[0]}`;

  // Convert score to stars (out of 5)
  const starRating = Math.round((score / 100) * 5);

  return (
    <div className="card bg-base-300 w-full shadow-xl rounded-lg overflow-hidden">
      {/* Profile Image */}
      <figure>
        <img
          src={user.profileImage}
          alt={user.name}
          className="h-52 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Name & Score */}
        <h2 className="card-title capitalize text-primary flex justify-between items-center">
          {user.name}
          <div className="flex items-center gap-1 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <IconStarFilled
                key={i}
                size={20}
                className={
                  i < starRating ? "text-warning" : "text-base-content/40"
                }
              />
            ))}
            <span className="text-sm font-semibold text-base-content/80">
              {score}%
            </span>
          </div>
        </h2>

        {/* Bio */}
        <p className="text-base-content">{user.bio || "No bio available"}</p>

        {/* Contact Info */}
        <div className="mt-3 space-y-1">
          <p className="flex items-center text-base-content/70">
            <IconMail className="w-5 h-5 mr-2 text-secondary" /> {user.email}
          </p>
          <p className="flex items-center text-base-content/70">
            <IconPhone className="w-5 h-5 mr-2 text-secondary" />{" "}
            {user.phone || "Not provided"}
          </p>
        </div>

        {/* Interests */}
        {user.interests.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {user.interests.map((interest: string, index: number) => (
              <div key={index} className="badge badge-outline text-sm">
                {interest}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="card-actions mt-4 flex flex-row sm:flex-row gap-2">
          <Link
            className="btn btn-primary w-full"
            href={`/user/profile?id=${user._id}`}
          >
            <IconUser size={18} />
            View Profile
          </Link>
          <Link
            className="btn btn-accent w-full"
            href={`/user/chat?id=${user._id}`}
          >
            <IconUsers size={18} />
            Chat
          </Link>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary w-full"
          >
            <IconMapPin size={18} />
            View Location
          </a>
        </div>
      </div>
    </div>
  );
};
export default MatchesPage;
