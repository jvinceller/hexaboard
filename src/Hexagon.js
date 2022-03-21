import {useState} from "react";
import * as PropTypes from "prop-types";

function Hexagon(props) {
    const [gClassNames, setGClassNames] = useState("");
    const polygonClassNames = `hexagon ${props.whole ? 'whole ' : ' '} note${props.note}`;

    const playNote = () => {
        setGClassNames("playing");
        props.playNoteCallback(props.noteToPlay);
    };
    const stopNote = () => {
        setGClassNames("stopped");
        props.stopNoteCallback(props.noteToPlay);
    };
    return <g className={gClassNames}
              transform={`translate(${props.x * 19 - 7}, ${props.y * 10.815 + 11})`} draggable="false"
              onMouseDown={props.usingTouch ? null : playNote}
              onMouseUp={props.usingTouch ? null : stopNote}
              onMouseEnter={props.glissando ? playNote : null}
              onMouseLeave={stopNote}
              onTouchStart={props.usingTouch ? playNote : null}
              onTouchCancel={props.usingTouch ? stopNote : null}
              onTouchEnd={stopNote}
    >
        <polygon className={polygonClassNames} points="6,10.3923 -6,10.3923 -12,0 -6,-10.3923 6,-10.3923 12,0"></polygon>
        <text className="hexagon-text" x="0" y="0" textAnchor="middle" alignmentBaseline="central">{props.text}</text>
    </g>;
}

Hexagon.propTypes = {
    y: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    usingTouch: PropTypes.bool.isRequired,
    glissando: PropTypes.bool.isRequired,
    noteToPlay: PropTypes.string.isRequired,
    playNoteCallback: PropTypes.func.isRequired
};

export default Hexagon;