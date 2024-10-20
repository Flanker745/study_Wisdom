import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // This will navigate to the previous page
  };

  const { mentor } = location.state;

  // Track the chat end for scrolling
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "mentor",
      text: "Hi, how can I assist you today?",
    },
    {
      id: 2,
      sender: "user",
      text: "I want to know more about your expertise.",
    },
    {
      id: 3,
      sender: "mentor",
      text: "I specialize in physics and math tutoring for competitive exams. What specifically are you looking to improve?",
    },
    {
      id: 4,
      sender: "user",
      text: "I'm struggling with calculus. Can you help me with that?",
    },
    {
      id: 5,
      sender: "mentor",
      text: "Absolutely! Calculus is one of my key areas. Are you preparing for a specific exam or class?",
    },
    {
      id: 6,
      sender: "user",
      text: "Yes, I'm preparing for the JEE exam.",
    },
    {
      id: 7,
      sender: "mentor",
      text: "Great! I have plenty of experience with JEE prep. Would you like to schedule a session to dive into calculus topics?",
    },
    {
      id: 8,
      sender: "user",
      text: "That sounds good. What time slots do you have available?",
    },
    {
      id: 9,
      sender: "mentor",
      text: "I have availability tomorrow evening at 6 PM or Thursday morning at 10 AM. Which works better for you?",
    },
    {
      id: 10,
      sender: "user",
      text: "Thursday morning works for me.",
    },
    {
      id: 11,
      sender: "mentor",
      text: "Perfect! I'll send over the details for our session. Do you have any specific calculus topics you want to focus on?",
    },
    {
      id: 12,
      sender: "user",
      text: "Yes, I’m having trouble with integrals and their applications.",
    },
    {
      id: 13,
      sender: "mentor",
      text: "Got it! We’ll focus on that during the session. Do you prefer video call or regular call?",
    },
    {
      id: 14,
      sender: "user",
      text: "I prefer video call, please.",
    },
    {
      id: 15,
      sender: "mentor",
      text: "Sounds good. I’ll send you a link before the session starts. Do you have any other questions for now?",
    },
    {
      id: 16,
      sender: "user",
      text: "What materials should I have ready for the session?",
    },
    {
      id: 17,
      sender: "mentor",
      text: "Just have your calculus textbook, a notebook, and a calculator handy. I’ll provide any additional resources.",
    },
    {
      id: 18,
      sender: "user",
      text: "Great! Looking forward to the session.",
    },
    {
      id: 19,
      sender: "mentor",
      text: "Me too! Feel free to message me if you have any questions before then.",
    },
    {
      id: 20,
      sender: "user",
      text: "Will do. Thanks again!",
    },
    {
      id: 21,
      sender: "mentor",
      text: "You're welcome! Have a good day.",
    },
    {
      id: 22,
      sender: "user",
      text: "You too!",
    },
    // Add more sample messages as needed
  ]);
  const [inputMessage, setInputMessage] = useState("");

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, sender: "user", text: inputMessage },
      ]);
      setInputMessage(""); // Clear input after sending

      // Simulate mentor response (This should come from the backend in a real app)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 2,
            sender: "mentor",
            text: "I have 10 years of experience in teaching " + mentor.expertise + ".",
          },
        ]);
      }, 1000); // Simulate a delay for response
    }
  };

  // Handling user input in the message box
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-neutral-200 dark:bg-gray-900 flex flex-col">
      {/* Chat header */}
      <div className="bg-white dark:bg-gray-800 p-4 flex items-center justify-between text-gray-500 dark:text-gray-200">
        <div className="flex items-center space-x-3">
          <button onClick={handleBackClick}>
            <FaArrowLeftLong className="text-2xl" />
          </button>
          <img
            src={mentor.profileImage}
            alt={mentor.dppName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold">{mentor.dppName}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              {mentor.expertise}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.sender === "user" ? "bg-purple-500" : "bg-gray-700"
              } p-3 rounded-lg max-w-xs sm:max-w-2xl text-white`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {/* Scroll to this div when new message is added */}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 bg-gray-800 flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-gray-200 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-all"
        >
          <FaPaperPlane className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
