import React, { useState, useMemo, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard, ChessboardDnDProvider, SparePiece } from "react-chessboard";

const Analysis = () => {
  const game = useMemo(() => new Chess("8/8/8/8/8/8/8/8 w - - 0 1"), []); // empty board
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [boardWidth, setBoardWidth] = useState(360);
  const [fenPosition, setFenPosition] = useState(game.fen());
  const handleSparePieceDrop = (piece, targetSquare) => {
    const color = piece[0];
    const type = piece[1].toLowerCase();
    const success = game.put({
      type,
      color
    }, targetSquare);
    if (success) {
      setFenPosition(game.fen());
    } else {
      alert(`The board already contains ${color === "w" ? "WHITE" : "BLACK"} KING`);
    }
    return success;
  };
  const handlePieceDrop = (sourceSquare, targetSquare, piece) => {
    const color = piece[0];
    const type = piece[1].toLowerCase();

    // this is hack to avoid chess.js bug, which I've fixed in the latest version https://github.com/jhlywa/chess.js/pull/426
    game.remove(sourceSquare);
    game.remove(targetSquare);
    const success = game.put({
      type,
      color
    }, targetSquare);
    if (success) setFenPosition(game.fen());
    return success;
  };
  const handlePieceDropOffBoard = sourceSquare => {
    game.remove(sourceSquare);
    setFenPosition(game.fen());
  };
  const handleFenInputChange = e => {
    const fen = e.target.value;
    const {
      valid
    } = game.validate_fen(fen);
    setFenPosition(fen);
    if (valid) {
      game.load(fen);
      setFenPosition(game.fen());
    }
  };
  const pieces = ["wP", "wN", "wB", "wR", "wQ", "wK", "bP", "bN", "bB", "bR", "bQ", "bK"];

  const boardWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px",
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  };
  
  const inputStyle = {
    margin: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "80%",
  };

  return <div style={{
    ...boardWrapper,
    margin: "0 auto",
    maxWidth: "70vh",
    backgroundColor: "rgb(97, 97, 97)",
    marginTop: "10px",
    borderRadius: "10px",
    padding: "10px"
  }}>
      <ChessboardDnDProvider>
        <h1 className="text-white font-bold text-2xl m-2">Analysis Board</h1>
        <div>
          <div style={{
          display: "flex",
          margin: `${boardWidth / 32}px ${boardWidth / 8}px`
        }}>
            {pieces.slice(6, 12).map(piece => <SparePiece key={piece} piece={(piece)} width={boardWidth / 8} dndId="ManualBoardEditor" />)}
          </div>
          <Chessboard onBoardWidthChange={setBoardWidth} id="ManualBoardEditor" boardOrientation={boardOrientation} position={game.fen()} onSparePieceDrop={handleSparePieceDrop} onPieceDrop={handlePieceDrop} onPieceDropOffBoard={handlePieceDropOffBoard} dropOffBoardAction="trash" customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
        }} />
          <div style={{
          display: "flex",
          margin: `${boardWidth / 32}px ${boardWidth / 8}px`
        }}>
            {pieces.slice(0, 6).map(piece => <SparePiece key={piece} piece={(piece)} width={boardWidth / 8} dndId="ManualBoardEditor" />)}
          </div>
        </div>
        <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
          <button style={buttonStyle} onClick={() => {
          game.reset();
          setFenPosition(game.fen());
        }}>
            Start position ♟️
          </button>
          <button style={buttonStyle} onClick={() => {
          game.clear();
          setFenPosition(game.fen());
        }}>
            Clear board 🗑️
          </button>
          <button style={buttonStyle} onClick={() => {
          setBoardOrientation(boardOrientation === "white" ? "black" : "white");
        }}>
            Flip board 🔁
          </button>
        </div>
        <input value={fenPosition} style={inputStyle} onChange={handleFenInputChange} placeholder="Paste FEN position to start editing" />
      </ChessboardDnDProvider>
    </div>;
}

export default Analysis;
