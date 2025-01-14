import React, { useState } from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="w-full">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-center mb-2 mt-10">
            Welcome to the GFW Scholastic Chess Club!
          </h1>
          <p className="text-lg text-center mb-8"></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8 mx-10">
          <div className="p-4 bg-green-600 rounded shadow flex justify-center items-center flex-col">
            <h2 className="text-xl font-bold mb-2">Practice Sportsmanship</h2>
            <p className="m-4 text-center">
              Shake hands before and after games, play with integrity, and see
              wins and losses as opportunities to grow. Grace and humility make
              us all stronger.
            </p>
          </div>
          <div className="p-4 bg-green-600 rounded shadow flex justify-center items-center flex-col">
            <h2 className="text-xl font-bold mb-2">Respect and Kindness</h2>
            <p className="m-4 text-center">
              Treat everyone with care and kindness to create a welcoming and
              inclusive environment. Respect makes this club a positive space
              for all.
            </p>
          </div>
          <div className="p-4 bg-green-600 rounded shadow flex justify-center items-center flex-col">
            <h2 className="text-xl font-bold mb-2">Learn and Focus</h2>
            <p className="m-4 text-center">
              Focus on each game and avoid distractions to foster growth. Share
              knowledge, learn from others, and improve through every
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
