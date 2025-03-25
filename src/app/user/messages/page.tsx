"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Message = () => {
  const { user } = useUser();
  const [chats, setChats] = useState<any[]>([]);

  const fetchChat = async () => {
    try {
      const response = await axios.get("/api/chat/getChat");
      const user = response.data.chat.map((chat: any) =>
        chat.users.find((user: any) => user._id !== user.id)
      );
      setChats(user);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center uppercase text-primary">
        Messages
      </h1>
      {chats.map((chat) => (
        <Link
          href={`chat?id=${chat._id}`}
          key={chat._id}
          className="flex items-center gap-3 p-2 border rounded-lg w-full"
        >
          <img
            src={chat.profileImage}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-bold">{chat.name}</h3>
            <p className="text-sm text-gray-600">{chat.email}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Message;
