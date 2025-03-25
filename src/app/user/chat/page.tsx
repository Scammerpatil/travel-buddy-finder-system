"use client";
import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Chat {
  users: User[];
  messages: [
    {
      sender: User;
      message: string;
      timestamp: Date;
    }
  ];
}

const ChatPage = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState<User>();
  const id = searchParams.get("id");
  const [chat, setChat] = useState<Chat>();
  const fetchChat = async () => {
    try {
      const chat = await axios.post("/api/chat", {
        sender: user?._id,
        receiver: id,
      });
      const receiver = await axios.get(`/api/user/getUser?id=${id}`);
      setReceiver(receiver.data.user);
      setChat(chat.data.chat);
    } catch (error) {
      console.error("Error fetching chat:", error);
    }
  };
  ("use strict");
  useEffect(() => {
    setInterval(fetchChat, 5000);
  }, []);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await axios.post("/api/chat/send", { message: message, chat, user });
      fetchChat();
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center uppercase text-primary">
        Chat With {receiver?.name}
      </h1>
      <div className="w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-15rem)] bg-base-300 rounded-lg shadow-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chat?.messages?.map((msg: any) => (
            <div
              key={msg._id}
              className={`chat ${
                msg.sender._id === user?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={msg.sender.profileImage} alt="User Avatar" />
                </div>
              </div>
              <div className="chat-header">
                {msg.sender.name}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </time>
              </div>
              <div className="chat-bubble">{msg.message}</div>
            </div>
          ))}
        </div>
        <form
          onSubmit={sendMessage}
          className="bg-base-200 px-5 py-3 rounded-b-lg flex gap-3"
        >
          <input
            type="text"
            className="input input-primary flex-1"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatPage;
