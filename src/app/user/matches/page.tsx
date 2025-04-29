"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import {
  IconMapPin,
  IconSearch,
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
      const res = await axios.get("/api/user/getMatches");
      const allMatches = res.data.matches;
      if (!allMatches || allMatches.length === 0) {
        setData("No Matches Found!!");
        return;
      }
      if (!user?.location?.coordinates) return;

      const userCoords = user.location.coordinates;

      const matchesWithDistance = allMatches.map((match: any) => {
        const matchCoords = match.user?.location?.coordinates;
        const distance = calculateDistance(
          userCoords[1],
          userCoords[0],
          matchCoords?.[1],
          matchCoords?.[0]
        );
        return { ...match, distance: Math.round(distance) };
      });

      matchesWithDistance.sort((a: any, b: any) => a.distance - b.distance);

      setMatches(matchesWithDistance);
      setFilteredMatches(matchesWithDistance);
    } catch (error) {
      console.error("Error finding matches:", error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    if (
      lat1 === undefined ||
      lon1 === undefined ||
      lat2 === undefined ||
      lon2 === undefined
    )
      return Infinity;

    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
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
          <Link
            href="/user/my-account"
            className="mt-10 btn btn-primary w-full"
          >
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

  return (
    <div className="card bg-base-300 w-full shadow-xl rounded-lg indicator">
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
            <span className="text-sm font-semibold text-base-content/80">
              {score}% Match
            </span>
            <br />
            <span className="text-xs text-info font-semibold indicator-item badge badge-primary">
              {match.distance} KM
            </span>
          </div>
        </h2>

        {/* Bio */}
        <p className="text-base-content">{user.bio || "No bio available"}</p>

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
