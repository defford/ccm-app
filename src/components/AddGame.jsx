import React, { useState } from "react";

const AddGame = ({ onClose }) => {
  const players = JSON.parse(localStorage.getItem("playerDetails")) || [];
  const [whitePlayer, setWhitePlayer] = useState("");
  const [blackPlayer, setBlackPlayer] = useState("");
  const [result, setResult] = useState("white"); // "white", "black", or "draw"

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing results from localStorage (or start with an empty array)
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];

    // Create a new result entry
    const newResult = {
      white: whitePlayer,
      black: blackPlayer,
      result: result,
    };

    // Add the new result to the array
    storedResults.push(newResult);

    // Save back to localStorage
    localStorage.setItem("results", JSON.stringify(storedResults));

    // Reset form fields (optional)
    setWhitePlayer("");
    setBlackPlayer("");
    setResult("white");
    onClose && onClose();
};

const handleClose = () => {
    setWhitePlayer("");
    setBlackPlayer("");
    setResult("white");
    onClose && onClose();
}

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg shadow-md bg-green-600"
      >
        <p className="text-lg text-white font-semibold mb-2">White</p>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={whitePlayer}
          onChange={(e) => setWhitePlayer(e.target.value)}
        >
          <option value="">Select Player</option>
          {players.map((player, index) => (
            <option key={index} value={player.playerName}>
              {player.playerName}
            </option>
          ))}
        </select>

        <p className="text-lg text-white font-semibold mb-2">Black</p>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={blackPlayer}
          onChange={(e) => setBlackPlayer(e.target.value)}
        >
          <option value="">Select Player</option>
          {players.map((player, index) => (
            <option key={index} value={player.playerName}>
              {player.playerName}
            </option>
          ))}
        </select>

        <p className="text-lg text-white font-semibold mb-2">Result</p>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={result}
          onChange={(e) => setResult(e.target.value)}
        >
          <option value="white">White</option>
          <option value="black">Black</option>
          <option value="draw">Draw</option>
        </select>
          <div className="flex justify-between">
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white shadow-md px-3 py-1 rounded"
        >
          Submit
        </button>
          <button onClick={handleClose}
          className="bg-green-700 hover:bg-green-800 text-white shadow-md px-3 py-1 rounded">
            Close
          </button>
          </div>
      </form>
      
    </>
  );
};

export default AddGame;
