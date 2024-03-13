import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      handleChatbotResponse(inputValue.trim().toLowerCase());
      setInputValue('');
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLogout=()=>{
    localStorage.removeItem("user");
    window.location.href="/";
  }

  const handleChatbotResponse = (message) => {
    let response = '';
    if (message === 'hi' || message === 'hello') {
        response = 'Hi there! How can I assist you today?';
      } else if (message === 'aaisha') {
        response = "Developer of covac";
      } else if (message.includes('weather')) {
        response = "Currently, I don't have access to weather information.";
      } else if (message.includes('help')) {
        response = "Sure, I can help! What do you need assistance with?";
      } else if (message.includes('thanks') || message.includes('thank you')) {
        response = "You're welcome!";
      } else if (message.includes('app')|| message.includes('website') || message.includes('covac')){
        response = "This is a Covid vaccination slot booking website"
      } else if (message.includes('slots') && message.includes('chennai')){
        response = "Yes!"
      } else if (message.includes('book') && message.includes('how')){
        response = "In your user dashboard hit the book now button for your desired slot"
      } else if (message.includes('book') && message.includes('where')){
        response = "In your user dashboard hit the book now button for your desired slot"
      }
      else {
        response = "I'm sorry, I didn't understand that.";
      }
      setMessages([...messages, { text: response, sender: 'bot' }]);
    };

  return (
    <div>
        <div className='flex items-center justify-between bg-gray-100 p-4'>
        <h1 className='text-3xl font-bold  lg:text-5xl lg:font-semibold text-black'>co<span style={{ color: 'rgb(7, 90, 158)' }}>V</span>ac</h1>
        <button onClick={handleLogout} className='text-white bg-black px-4 py-2 rounded'>Logout</button>
      </div>
        <div className="max-w-md mx-auto mt-10">
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`text-${message.sender === 'user' ? 'right' : 'left'}`}>
                <p className="inline-block bg-gray-200 rounded-lg p-2">{message.text}</p>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type your message..."
            />
            <button
              onClick={handleMessageSend}
              className="bg-blue-500 text-white rounded-r-lg px-4 py-2 ml-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Send
            </button>
          </div>
        </div>
    </div>
  );
};

export default ChatBot;
