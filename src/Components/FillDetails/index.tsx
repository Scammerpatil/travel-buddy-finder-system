"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const questions = [
  {
    key: "travelStyle",
    question: "What kind of traveler are you?",
    options: ["Backpacking", "Luxury", "Adventure", "Cultural"],
  },
  {
    key: "preferredCompanion",
    question: "Who do you prefer to travel with?",
    options: ["Anyone", "Solo", "Same Gender", "Small Group", "Large Group"],
  },
  {
    key: "budget",
    question: "What's your ideal travel budget?",
    options: ["Low", "Medium", "High"],
  },
  {
    key: "languages",
    question: "Which languages can you speak? (multi-select)",
    options: ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Other"],
    multi: true,
  },
  {
    key: "interests",
    question: "What are your top interests while traveling?",
    options: [
      "Food",
      "Nature",
      "Culture",
      "Nightlife",
      "Photography",
      "Shopping",
    ],
    multi: true,
  },
  {
    key: "destinations",
    question: "What kind of destinations excite you the most?",
    options: ["Mountains", "Beaches", "Cities", "Forests", "Historical Sites"],
    multi: true,
  },
  {
    key: "season",
    question: "Which season do you love traveling in?",
    options: ["Summer", "Winter", "Monsoon", "All Year Round"],
  },
  {
    key: "spontaneity",
    question: "Do you prefer planned or spontaneous trips?",
    options: ["Planned", "Spontaneous"],
  },
  {
    key: "connectWithOthers",
    question: "Would you like to connect with similar travelers?",
    options: ["Yes", "No"],
  },
];

export default function FillDetails() {
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = questions[step];

  if (!user) return null;

  const handleOptionSelect = (option) => {
    if (current.multi) {
      const currentAnswers = answers[current.key] || [];
      if (currentAnswers.includes(option)) {
        setAnswers({
          ...answers,
          [current.key]: currentAnswers.filter((o) => o !== option),
        });
      } else {
        setAnswers({
          ...answers,
          [current.key]: [...currentAnswers, option],
        });
      }
    } else {
      setAnswers({ ...answers, [current.key]: option });
      setTimeout(() => setStep((prev) => prev + 1), 500);
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const res = axios.put("/api/user/update-user", { answers });
      toast.promise(res, {
        loading: "Updating...",
        success: () => {
          setTimeout(() => {
            window.location.href = "/user/dashboard";
          }, 1000);
          return <b>Updated successfully!</b>;
        },
        error: <b>Failed to update.</b>,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-xl bg-base-200 p-8 rounded-2xl shadow-xl">
        <AnimatePresence mode="wait">
          {step < questions.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-accent uppercase">
                {questions[step].question}
              </h2>
              <div className="flex flex-wrap gap-4">
                {questions[step].options.map((option) => {
                  const selected = questions[step].multi
                    ? answers[questions[step].key]?.includes(option)
                    : answers[questions[step].key] === option;
                  return (
                    <button
                      key={option}
                      className={`btn font-medium ${
                        selected ? "btn-accent" : "btn-outline btn-primary"
                      }`}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {questions[step].multi && (
                <button
                  className="btn btn-success mt-4 w-full"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-accent mb-4 uppercase">
                All set, {user.name}!
              </h2>
              <p className="mb-6 text-base-content">
                Thanks for sharing. We’ll use this to enhance your travel
                experiences.
              </p>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Finish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
