"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { IconUsers } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";

const MatchesPage = () => {
  const { user } = useUser();
  const [data, setData] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.destinations?.length === 0 || user?.interests?.length === 0) {
      setData("Fill All Your Basic Details!!");
      setLoading(false);
    }
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const matchedUsers = await axios.get("/api/user/getMatches");
      setMatches(matchedUsers.data.matches);
      console.log("Matches:", matchedUsers.data.matches);
    } catch (error) {
      console.error("Error finding matches:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        Find Your Travel Buddy
      </h1>
      {data && (
        <>
          <p className="text-center pt-10 text-3xl uppercase font-semibold flex items-center justify-center">
            {data}
          </p>
          <Link
            href="/user/settings"
            className="text-center mt-4 link link-primary link-hover w-full"
          >
            Go and fill the details
          </Link>
        </>
      )}
      {matches.length !== 0 ? (
        <MatchCard match={matches} />
      ) : (
        <p className="text-center pt-10 text-3xl uppercase font-semibold flex items-center justify-center space-y-4">
          No Matches Found.
          <br />
          Try to update your interests and destinations
        </p>
      )}
    </>
  );
};

const MatchCard = ({ match }) => {
  return (
    <div className="card bg-base-100 shadow-lg p-4 flex items-center space-x-4 hover:bg-primary hover:text-white transition">
      <IconUsers className="text-3xl" />
      <div>
        <h2 className="text-lg font-semibold">{match?.name}</h2>
        <p className="text-sm">{match?.address?.street}</p>
        <p className="text-sm">
          Shared Interests: {match?.interests?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MatchesPage;
