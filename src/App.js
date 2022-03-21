import './App.css';
import Sound from './Sound';
import {useEffect, useState} from "react";
import * as Soundfont from "soundfont-player";
import HexaBoard from "./HexaBoard";
import {instruments} from "./constants";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function App() {
    const [soundPlayer, setSoundPlayer] = useState(undefined);
    const [cache, setCache] = useState(new Map());
    const [instrument, setInstrument] = useState('orchestral_harp');
    const [glissando, setGlissando] = useState(false);

    // enable sound after first user gesture only, because of security guidelines
    const [soundEnabled, setEnableSound] = useState(false);

    const resumeAudio = () => {
        if (soundEnabled && audioContext.state === 'suspended') {
            return audioContext.resume();
        } else {
            return Promise.resolve();
        }
    };

    useEffect(() => {
        console.log('loading instrument: ', instrument);
        Soundfont.instrument(audioContext, instrument).then(function (soundPlayer) {
            console.log('instrument has been loaded: ', instrument);
            setSoundPlayer(soundPlayer);
        })
    }, [instrument]);

    function changeInstrument() {
        if (soundPlayer) {
            console.log('stopping all notes');
            soundPlayer.stop();
        }
        setCache(new Map());
        setSoundPlayer(undefined);

        const oldInstrumentIndex = instruments.findIndex(i => i === instrument);
        const newInstrumentIndex = (oldInstrumentIndex + 1) % instruments.length;

        setInstrument(instruments[newInstrumentIndex]);
    }

    function playNote(note) {
        if (!soundEnabled) {
            return;
        }
        resumeAudio().then(() => {
            if (cache.has(note)) {
                cache.get(note).stop(audioContext.currentTime + 0.5);
            }
            const newCache = cache.set(note, soundPlayer.start(note));
            setCache(newCache);
        })
    }

    function stopNote(note) {
        if (!soundEnabled) {
            return;
        }
        resumeAudio().then(() => {
            if (cache.has(note)) {
                cache.get(note).stop(audioContext.currentTime);
                cache.delete(note);
                setCache(cache);
            }
        })
    }

    function toggleSound() {
        setEnableSound(!soundEnabled);
    }

    function toggleGlissando() {
        setGlissando(!glissando);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hexaboard</h1>
            </header>
            <section>
                {soundPlayer ? <HexaBoard
                    startingNote="C6"
                    cols={7} rows={4}
                    useTouchEvents={false} glissando={glissando}
                    playNoteCallback={playNote}
                    stopNoteCallback={stopNote}></HexaBoard> : null}
            </section>
            <div onClick={() => toggleSound()}><Sound on={soundEnabled}/></div>
            <div onClick={() => changeInstrument()}>NEXT INSTRUMENT</div>
            <div onClick={() => toggleGlissando()}>{glissando ? 'HOVER > CLICK' : 'CLICK > HOVER'}</div>
        </div>
    );
}

export default App;
