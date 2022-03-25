import {useState} from "react";
import * as PropTypes from "prop-types";
import "./TouchBubble.css";

function TouchBubble(props) {
    const [topLeftClassNames, setTopLeftClassNames] = useState("touchBubble");
    const [topRightClassNames, setTopRightClassNames] = useState("touchBubble");
    const [bottomLeftClassNames, setBottomLeftClassNames] = useState("touchBubble");
    const [bottomRightClassNames, setBottomRightClassNames] = useState("touchBubble");

    // top
    const playTopLeftNotes = () => {
        setTopLeftClassNames("touchBubble playing");
        props.topLeftNotesToPlay.forEach(noteToPlay => props.playNoteCallback(noteToPlay));
    };
    const stopTopLeftNotes = () => {
        setTopLeftClassNames("touchBubble stopped");
        props.topLeftNotesToPlay.forEach(noteToPlay => props.stopNoteCallback(noteToPlay));
    };
    const playTopRightNotes = () => {
        setTopRightClassNames("touchBubble playing");
        props.topRightNotesToPlay.forEach(noteToPlay => props.playNoteCallback(noteToPlay));
    };
    const stopTopRightNotes = () => {
        setTopRightClassNames("touchBubble stopped");
        props.topRightNotesToPlay.forEach(noteToPlay => props.stopNoteCallback(noteToPlay));
    };
    // bottom
    const playBottomLeftNotes = () => {
        setBottomLeftClassNames("touchBubble playing");
        props.bottomLeftNotesToPlay.forEach(noteToPlay => props.playNoteCallback(noteToPlay));
    };
    const stopBottomLeftNotes = () => {
        setBottomLeftClassNames("touchBubble stopped");
        props.bottomLeftNotesToPlay.forEach(noteToPlay => props.stopNoteCallback(noteToPlay));
    };
    const playBottomRightNotes = () => {
        setBottomRightClassNames("touchBubble playing");
        props.bottomRightNotesToPlay.forEach(noteToPlay => props.playNoteCallback(noteToPlay));
    };
    const stopBottomRightNotes = () => {
        setBottomRightClassNames("touchBubble stopped");
        props.bottomRightNotesToPlay.forEach(noteToPlay => props.stopNoteCallback(noteToPlay));
    };

    return props.topLeftNotesToPlay ? (<g>
            <circle cx={props.x * 19 - 13} cy={props.y * 10.7} r={6}
                    className={topLeftClassNames}
                    onMouseDown={props.usingTouch ? null : playTopLeftNotes}
                    onMouseUp={props.usingTouch ? null : stopTopLeftNotes}
                    onMouseEnter={props.glissando ? playTopLeftNotes : null}
                    onMouseLeave={stopTopLeftNotes}
                    onTouchStart={props.usingTouch ? playTopLeftNotes : null}
                    onTouchCancel={props.usingTouch ? stopTopLeftNotes : null}
                    onTouchEnd={stopTopLeftNotes}
            />
            <circle cx={props.x * 19 - 1} cy={props.y * 10.7} r={6}
                    className={topRightClassNames}
                    onMouseDown={props.usingTouch ? null : playTopRightNotes}
                    onMouseUp={props.usingTouch ? null : stopTopRightNotes}
                    onMouseEnter={props.glissando ? playTopRightNotes : null}
                    onMouseLeave={stopTopRightNotes}
                    onTouchStart={props.usingTouch ? playTopRightNotes : null}
                    onTouchCancel={props.usingTouch ? stopTopRightNotes : null}
                    onTouchEnd={stopTopRightNotes}
            />
        </g>
    ) : (<g>
            <circle cx={props.x * 19 - 13} cy={props.y * 10.7 + 21.4} r={6}
                    className={bottomLeftClassNames}
                    onMouseDown={props.usingTouch ? null : playBottomLeftNotes}
                    onMouseUp={props.usingTouch ? null : stopBottomLeftNotes}
                    onMouseEnter={props.glissando ? playBottomLeftNotes : null}
                    onMouseLeave={stopBottomLeftNotes}
                    onTouchStart={props.usingTouch ? playBottomLeftNotes : null}
                    onTouchCancel={props.usingTouch ? stopBottomLeftNotes : null}
                    onTouchEnd={stopBottomLeftNotes}
            />
            <circle cx={props.x * 19.1 - 1} cy={props.y * 10.7 + 21.4} r={6}
                    className={bottomRightClassNames}
                    onMouseDown={props.usingTouch ? null : playBottomRightNotes}
                    onMouseUp={props.usingTouch ? null : stopBottomRightNotes}
                    onMouseEnter={props.glissando ? playBottomRightNotes : null}
                    onMouseLeave={stopBottomRightNotes}
                    onTouchStart={props.usingTouch ? playBottomRightNotes : null}
                    onTouchCancel={props.usingTouch ? stopBottomRightNotes : null}
                    onTouchEnd={stopBottomRightNotes}
            />
        </g>
    );
}

TouchBubble.propTypes = {
    y: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['top', 'bottom']).isRequired,
    usingTouch: PropTypes.bool.isRequired,
    glissando: PropTypes.bool.isRequired,
    topLeftNotesToPlay: PropTypes.arrayOf(PropTypes.string),
    topRightNotesToPlay: PropTypes.arrayOf(PropTypes.string),
    bottomLeftNotesToPlay: PropTypes.arrayOf(PropTypes.string),
    bottomRightNotesToPlay: PropTypes.arrayOf(PropTypes.string),
    playNoteCallback: PropTypes.func.isRequired,
    stopNoteCallback: PropTypes.func.isRequired
};

export default TouchBubble;