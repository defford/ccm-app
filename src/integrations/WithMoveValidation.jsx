import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: []
  };

  componentDidMount() {
    this.game = new Chess();
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: this.getSquareStyles(pieceSquare, history)
    }));
  };

  getSquareStyles = (pieceSquare, history) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
      [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
      ...(sourceSquare && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      }),
      ...(targetSquare && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
      })
    };
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for simplicity
    });

    if (move === null) {
      // If the move is illegal, revert to the last valid position
      this.setState({
        fen: this.game.fen(),
        history: this.game.history({ verbose: true }),
        squareStyles: this.getSquareStyles(this.state.pieceSquare, this.state.history)
      });
      return;
    }

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: this.getSquareStyles(this.state.pieceSquare, this.state.history)
    });
  };

  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: this.getSquareStyles(square, history),
      pieceSquare: square
    }));

    const move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for simplicity
    });

    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return (
      <Chessboard
        id="humanVsHuman"
        width={320}
        position={fen}
        onDrop={this.onDrop}
        onSquareClick={this.onSquareClick}
        dropSquareStyle={dropSquareStyle}
        squareStyles={squareStyles}
      />
    );
  }
}

export default HumanVsHuman;