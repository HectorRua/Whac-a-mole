import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Board from "./Board";
import { GROUND, MOLE, TileType } from "./Board/Tile";
import { LanguageProvider } from "./Providers/LanguageContext";
import { copyObject, createMatrix, createRange, getRandomInt, shuffleArray } from "./Utils/utils";
import "./PRUEBA.css";

function Game() {
	const [boardWidth, setBoardWidth] = useState(4);
	const [boardHeight, setBoardHeight] = useState(4);
	const [boardMatrix, setBoardMatrix] = useState(createMatrix(boardWidth, boardHeight, GROUND));
	const [score, setScore] = useState(0);
	const [timerCycles, setTimerCycles] = useState(0);
	const [lostMoles, setLostMoles] = useState({lastTimerCycle: 0, lostMoles: 0});
	const [timer, setTimer] = useState<NodeJS.Timer | undefined>(undefined);
	
	const handleClickBoard = useCallback((indexX: number, indexY: number) => {
		const NewMatrix = copyObject(boardMatrix);
		const tileValue = NewMatrix[indexY][indexX]
		if (tileValue === MOLE) {
			NewMatrix[indexY][indexX] = GROUND
			setBoardMatrix(NewMatrix);
			setScore(score + 10)
		}
	}, [boardMatrix]);

	const clearBoardAndCountMoles = (boardMatrix: Array<Array<TileType>>) =>{
		const rowsNumber = boardMatrix.length;
		const columnsNumber = boardMatrix[0].length;
		let molesCount = 0;

		for(let j: number = 0; j<rowsNumber; j++){
			for(let i: number = 0; i<columnsNumber; i++){
				if (boardMatrix[j][i] === MOLE){
					molesCount ++;
					boardMatrix[j][i] = GROUND
				}
			}	
		}
		return molesCount
	}

	const addRandomMole = () => {
		setTimerCycles((newTimerCycles)=>{
		console.log(JSON.stringify({newTimerCycles, timerCycles}))

		setBoardMatrix(boardMatrix => {
			const NewMatrix = copyObject(boardMatrix);
			const lostMoles = clearBoardAndCountMoles(NewMatrix)

			const rowsNumber = boardMatrix.length;
			const columnsNumber = boardMatrix[0].length;

			let range = createRange(0, (rowsNumber*columnsNumber)-1)
			range = shuffleArray(range)
			
			console.log(JSON.stringify(range))
			//TODO: Añadir soporte para mas de un topo a la vez
	
			const indexY = getRandomInt(0, rowsNumber -1)
			const indexX = getRandomInt(0, columnsNumber - 1)
			NewMatrix[indexY][indexX] = MOLE;


			setLostMoles(oldLostMolesObject => {
				if (oldLostMolesObject.lastTimerCycle < newTimerCycles){
					return {
						lastTimerCycle: newTimerCycles,
						lostMoles: oldLostMolesObject.lostMoles + lostMoles
					}
				}else{
					return oldLostMolesObject
				}
				
			})
			return NewMatrix
		});
		return newTimerCycles + 1
	})

	}

	const handleClickStart = useCallback(() => {
		addRandomMole()
		const timer = setInterval(() => {
			addRandomMole()
		}, 3000)
		setTimer(timer)

	}, [])

	const handleClickStop = useCallback(() => {
		clearInterval(timer)
		setTimer(undefined)
	}, [timer])


	const screenHeight = window.innerHeight
	const screenWidth = window.innerWidth

	return (
		<LanguageProvider>
			<div>

				<h1>SCORE: {score} LOST MOLES: {lostMoles.lostMoles}</h1>
				{timer === undefined && <button onClick={handleClickStart}>START</button>}
				{timer !== undefined && <button onClick={handleClickStop}>STOP</button>}
				<Board
					boardMatrix={boardMatrix}
					onClick={handleClickBoard}
					width={screenWidth}
					height={screenHeight - 150}
				/>

			</div>
		</LanguageProvider>
	);
}

export default Game;
