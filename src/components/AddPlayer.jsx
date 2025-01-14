import React, { useState }from "react";


const AddPlayer = ({ players, setPlayers, onClose }) => {

  const handleAddPlayer = (e) => {
    e.preventDefault();
    const playerDetails = {
      playerName: e.target.name.value,
      points: 0
    };
    if (playerDetails.playerName.trim() === "") return;

    const updatedPlayers = [...players, playerDetails];
    localStorage.setItem("playerDetails", JSON.stringify(updatedPlayers));
    setPlayers(updatedPlayers);
    e.target.name.value = "";

    onClose && onClose();
  };

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={handleAddPlayer}
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-green-600 rounded-md shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddPlayer;
