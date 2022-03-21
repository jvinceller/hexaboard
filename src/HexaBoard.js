import {notes} from "./constants";
import * as PropTypes from "prop-types";
import Hexagon from "./Hexagon";

function HexaBoard(props) {
    const startingNoteName = props.startingNote;
    const startingNoteLabelMatch = startingNoteName.match(/[CDEFGAB][#]?/);
    const startingNoteLabel = startingNoteLabelMatch ? startingNoteLabelMatch[0] : 'C';
    const startingNoteNumberMatch = startingNoteName.match(/[0-8]/);
    const startingNoteNumber = startingNoteNumberMatch ? parseInt(startingNoteNumberMatch[0]) : 4;
    const startingNote = notes.findIndex(note => note.label === startingNoteLabel) + (startingNoteNumber * 12);

    return <svg width="662" height="421" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {new Array(props.rows).fill("", 0, props.rows).map((_, rowIndex) => (
            new Array(props.cols).fill("", 0, props.cols).map((_, colIndex) => {
                const x = colIndex;
                const y = rowIndex * 2 + colIndex % 2;
                const key = rowIndex * props.cols + colIndex;
                const noteNumber = startingNote - rowIndex * 7 - ((colIndex % 2) * 3 - Math.floor(colIndex / 2));
                const noteOctave = Math.floor(noteNumber / 12);
                const note = (12 + noteNumber) % 12;
                const noteProps = notes[note];
                const noteToPlay = `${noteProps.label}${noteOctave}`;
                return <Hexagon key={key}
                                x={x} y={y}
                                text={noteToPlay}
                                whole={noteProps.whole }
                                note={note}
                                noteToPlay={noteToPlay}
                                usingTouch={props.useTouchEvents}
                                glissando={props.glissando}
                                playNoteCallback={props.playNoteCallback}
                                stopNoteCallback={props.stopNoteCallback}></Hexagon>
            })
        ))}
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