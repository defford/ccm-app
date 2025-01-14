import React, { useState, useEffect } from "react";
import AddPlayer from "./AddPlayer";
import AddGame from "./AddGame";

const Ladder = () => {
  const [addGameDisplay, setAddGameDisplay] = useState(false);
  const [addPlayerDisplay, setAddPlayerDisplay] = useState(false);
  const [addButtonDisplay, setAddButtonDisplay] = useState(true);
  const [players, setPlayers] = useState(() => {
    const storedPlayers = localStorage.getItem("playerDetails");
    return storedPlayers ? JSON.parse(storedPlayers) : [];
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  

  useEffect(() => {
    updatePointsFromResults();
  }, []);

  const resetPoints = () => {
    // Clear results in localStorage
    localStorage.setItem("results", JSON.stringify([]));
  
    // Reset player points
    players.forEach((player) => {
      player.points = 0;
    });
  
    // Save updated players to localStorage
    localStorage.setItem("playerDetails", JSON.stringify(players));
  
    // Update state to trigger a re-render
    setPlayers([...players]);
  };

  const updatePointsFromResults = () => {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];
    // Reset points
    players.forEach((player) => {
      player.points = 0;
    });
    const updatedPlayers = [...players];

    storedResults.forEach((game) => {
      // Find the matching white/black players
      const whitePlayer = updatedPlayers.find(
        (p) => p.playerName === game.white
      );
      const blackPlayer = updatedPlayers.find(
        (p) => p.playerName === game.black
      );
      if (!whitePlayer || !blackPlayer) return;
      // Everyone gets 1 point for playing
      whitePlayer.points += 1;
      blackPlayer.points += 1;
      // Winner/draw bonus
      if (game.result === "white") {
        whitePlayer.points += 1;
      } else if (game.result === "black") {
        blackPlayer.points += 1;
      } else if (game.result === "draw") {
        whitePlayer.points += 0.5;
        blackPlayer.points += 0.5;
      }
    });

    setPlayers(updatedPlayers.sort((a, b) => b.points - a.points));
    localStorage.setItem("playerDetails", JSON.stringify(updatedPlayers));
  };

  const handleAddPlayer = () => {
    setAddPlayerDisplay(!addPlayerDisplay);
    setAddButtonDisplay(!addButtonDisplay);
  };

  const handleAddGame = () => {
    updatePointsFromResults(); // Recalculate points
    setAddGameDisplay(!addGameDisplay);
    setAddButtonDisplay(!addButtonDisplay);
  };

  const handleDeletePlayer = (playerName) => {
    const filteredPlayers = players.filter((p) => p.playerName !== playerName);
    setPlayers(filteredPlayers);
    localStorage.setItem("playerDetails", JSON.stringify(filteredPlayers));
  };

  const handleShowHistory = (playerName) => {
    setSelectedPlayer(playerName);
  };

  function playerGames(playerName) {
    const storedResults = JSON.parse(localStorage.getItem("results")) || [];
    const games = storedResults.filter(
      (g) => g.white === playerName || g.black === playerName
    );
    if (games.length === 0) {
      return <p>No games found for {playerName}.</p>;
    }
    return (
      <>
        {games.map((game, i) => (
          <div className="my-2" key={i}>
            <div className="flex">
              <div className="w-1/2 h-8 bg-slate-300 text-black flex flex-row items-center justify-between px-4 rounded-xl mx-2">
                <p className="font-bold">{game.white}</p>
                <p className="text-xl">
                  {game.result === "white"
                    ? "1"
                    : game.result === "draw"
                    ? "½"
                    : "0"}
                </p>
              </div>
              <div className="w-1/2 h-8 bg-slate-800 text-white flex flex-row items-center justify-between px-4 rounded-xl mx-2">
                <p className="font-bold">{game.black}</p>
                <p className="text-xl">
                  {game.result === "black"
                    ? "1"
                    : game.result === "draw"
                    ? "½"
                    : "0"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="flex justify-center items-start padding-20 mx-4">
      <div className="w-full max-w-2xl mb-10">
      <h1 className="flex justify-center text-white text-5xl font-black mb-6 p-8">CHESS LADDER</h1>
        {addButtonDisplay && (
          <div className="flex gap-2 justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
              onClick={handleAddGame}
            >
              Add Game
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
              onClick={handleAddPlayer}
            >
              Add Player
            </button>
          </div>
        )}
        <div className="my-10 w-full">
          {addGameDisplay && <AddGame onClose={handleAddGame} />}
          {addPlayerDisplay && (
            <AddPlayer
              players={players}
              setPlayers={setPlayers}
              onClose={handleAddPlayer}
            />
          )}
        </div>

        <div>
          {players.map((player, index) => {
            return selectedPlayer === player.playerName ? (
              <div
                key={index}
                className="bg-green-600 border border-gray-300 rounded p-4 my-4 relative"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  Game History for {player.playerName}
                </h3>
                {playerGames(player.playerName)}
                <button
                  className="absolute bottom-0 right-0 text-white px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Are you sure you want to delete this player?")) {
                      handleDeletePlayer(player.playerName);
                    }
                  }}
                >
                  X
                </button>
                <button
                  className="absolute top-3 right-2 text-white px-2 rounded"
                  onClick={() => setSelectedPlayer("")}
                >
                  Close
                </button>
              </div>
            ) : (
              <div
                key={index}
                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white my-4 rounded shadow-md transition h-12"
                onClick={() => handleShowHistory(player.playerName)}
              >
                <div className="flex justify-between text-2xl px-5 pt-2 font-bold">
                  <p>{player.playerName}</p>
                  <p>{player.points}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={resetPoints}
        className="text-white bg-green-600 hover:bg-green-700 rounded p-2 px-8">Reset</button>
      </div>
    </div>
  );
};

export default Ladder;
