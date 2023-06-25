import React, {useEffect, useState} from "react";
import GameCircle from "./GameCircle";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import { isWinner, isDraw } from "./helper";
import { GAME_STATE_IDLE, GAME_STATE_WIN,GAME_STATE_PLAYING, NO_CIRCLES, NO_PLAYER, PLAYER_1, PLAYER_2, GAME_STATE_DRAW } from "../Constants";


const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_IDLE);
    const [winPlayer, setWinner] = useState(NO_PLAYER);

    console.log(gameBoard);


    useEffect(() => {
        initGame();
    }, []);


    const initGame = () => {
        setGameBoard(Array(16).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
        setWinner(NO_PLAYER);
    }

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }
    
    const circleClicked = (id) => {
        console.log('circle clicked' + id);

        if(gameBoard[id] !== NO_PLAYER) return;
        if(gameState !== GAME_STATE_PLAYING) return;

        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN);
            setWinner(currentPlayer);
            alert(`Player ${currentPlayer} has won!`);
        }

        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinner(NO_PLAYER);
        }

        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

        console.log(gameBoard);
        console.log(currentPlayer);
      }

    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }
    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard" >
            {initBoard()}
            </div>
            <Footer onClickEvent={initGame} />
        </>
    )
}

export default GameBoard;