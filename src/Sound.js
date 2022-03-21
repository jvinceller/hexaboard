import './Sound.css';

function Sound(props) {
    const classNames = `sound ${props.on ? 'on' : 'off'}`;
    return <div className={classNames}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
    </div>;
}

export default Sound;