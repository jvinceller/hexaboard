import {notes} from "./constants";
import * as PropTypes from "prop-types";
import Hexagon from "./Hexagon";
import TouchBubble from "./TouchBubble";

function getCell(arr, x, y) {
    return (y >= 0 && y < arr.length && x >= 0 && x < arr[y].length) ? arr[y][x] : undefined;
}

function HexaBoard(props) {
    function calculateStartingNote(startingNoteName) {
        const startingNoteLabelMatch = startingNoteName.match(/[CDEFGAB][#]?/);
        const startingNoteLabel = startingNoteLabelMatch ? startingNoteLabelMatch[0] : 'C';
        const startingNoteNumberMatch = startingNoteName.match(/[0-8]/);
        const startingNoteNumber = startingNoteNumberMatch ? parseInt(startingNoteNumberMatch[0]) : 4;
        return notes.findIndex(note => note.label === startingNoteLabel) + (startingNoteNumber * 12);
    }

    const startingNote = calculateStartingNote(props.startingNote);

    const calculateNoteProperties = (startingNote, rowIndex, colIndex) => {
        const y = rowIndex * 2 + colIndex % 2;
        const noteNumber = startingNote - rowIndex * 7 - ((colIndex % 2) * 3 - Math.floor(colIndex / 2));
        const noteOctave = Math.floor(noteNumber / 12);
        const note = (12 + noteNumber) % 12;
        const noteProps = notes[note];
        const noteToPlay = `${noteProps.label}${noteOctave}`;
        return {
            x: colIndex, y, note, whole: noteProps.whole, noteToPlay
        };
    };

    const createBoard = () => {
        // creating the board array, which is a two-dimensional array, where each row is
        // built as a linear array of cells, where cells are alternating upper and lower
        // cells. So one row is built like this: [UPPER,LOWER,UPPER,LOWER,...]
        const board = Array.from(Array(props.rows), () => new Array(props.cols));
        // filling it with note properties
        for (let rowIndex = 0; rowIndex < props.rows; rowIndex++) {
            for (let colIndex = 0; colIndex < props.cols; colIndex++) {
                const {x, y, note, whole, noteToPlay} = calculateNoteProperties(startingNote, rowIndex, colIndex);
                board[rowIndex][colIndex] = {rowIndex, colIndex, x, y, note, whole, noteToPlay};
            }
        }
        // filling it with the directional links to other cells
        for (let rowIndex = 0; rowIndex < props.rows; rowIndex++) {
            for (let colIndex = 0; colIndex < props.cols; colIndex++) {
                // calculating the cells around the cell itself
                const cell = getCell(board, colIndex, rowIndex);
                const leftCell = getCell(board, colIndex - 1, rowIndex);
                const rightCell = getCell(board, colIndex + 1, rowIndex);
                const topCell = getCell(board, colIndex, rowIndex - 1);
                const topLeftCell = getCell(board, colIndex - 1, rowIndex - 1);
                const topRightCell = getCell(board, colIndex + 1, rowIndex - 1);
                const bottomCell = getCell(board, colIndex, rowIndex + 1);
                const bottomLeftCell = getCell(board, colIndex - 1, rowIndex + 1);
                const bottomRightCell = getCell(board, colIndex + 1, rowIndex + 1);

                // calculating which cells are in which optical direction
                if ((colIndex % 2) === 0) {
                    cell.topLeft = [cell, topCell, topLeftCell].filter(Boolean);
                    cell.topRight = [cell, topCell, topRightCell].filter(Boolean);
                    cell.bottomLeft = [cell, bottomCell, leftCell].filter(Boolean);
                    cell.bottomRight = [cell, bottomCell, rightCell].filter(Boolean);
                } else {
                    cell.topLeft = [cell, topCell, leftCell].filter(Boolean);
                    cell.topRight = [cell, topCell, rightCell].filter(Boolean);
                    cell.bottomLeft = [cell, bottomCell, bottomLeftCell].filter(Boolean);
                    cell.bottomRight = [cell, bottomCell, bottomRightCell].filter(Boolean);
                }
            }
        }
        return board;
    }

    const board = createBoard();

    const renderBoard = (b) =>
        b.map(row =>
            row.map(cell => {
                const {x, y, rowIndex, colIndex} = cell;
                const key = `hexagon-${colIndex}-${rowIndex}`;
                return <Hexagon
                    key={key}
                    x={x} y={y}
                    text={cell.noteToPlay}
                    whole={cell.whole}
                    note={cell.note}
                    noteToPlay={cell.noteToPlay}
                    usingTouch={props.useTouchEvents}
                    glissando={props.glissando}
                    playNoteCallback={props.playNoteCallback}
                    stopNoteCallback={props.stopNoteCallback}/>
            })
        );

    const renderTouchBubbles = (b) => [
        // circles in the middle
        ...b.map(row =>
            row.map(cell => {
                const {x, y, rowIndex, colIndex} = cell;
                const key = `touchbubble-${colIndex}-${rowIndex}`;
                return <TouchBubble
                    key={key}
                    x={x} y={y}
                    type="top"
                    topLeftNotesToPlay={cell.topLeft.map(c => c.noteToPlay)}
                    topRightNotesToPlay={cell.topRight.map(c => c.noteToPlay)}
                    usingTouch={props.useTouchEvents}
                    glissando={props.glissando}
                    playNoteCallback={props.playNoteCallback}
                    stopNoteCallback={props.stopNoteCallback}/>
            })
        ),
        // circles on bottom
        ...b[b.length - 1].map(cell => {
            const {x, y, colIndex} = cell;
            const key = `touchbubble-bottom-${colIndex}`;
            return <TouchBubble
                key={key}
                x={x} y={y}
                type="bottom"
                bottomLeftNotesToPlay={cell.bottomLeft.map(c => c.noteToPlay)}
                bottomRightNotesToPlay={cell.bottomRight.map(c => c.noteToPlay)}
                usingTouch={props.useTouchEvents}
                glissando={props.glissando}
                playNoteCallback={props.playNoteCallback}
                stopNoteCallback={props.stopNoteCallback}/>
        })
    ];

    return <svg width="662" height="421" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g className="board">{renderBoard(board)}</g>
        <g className="touchbubbles">{renderTouchBubbles(board)}</g>
    </svg>;
}

HexaBoard.propTypes = {
    startingNote: PropTypes.string.isRequired,
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    useTouchEvents: PropTypes.bool.isRequired,
    glissando: PropTypes.bool.isRequired,
    playNoteCallback: PropTypes.func.isRequired
};

export default HexaBoard;