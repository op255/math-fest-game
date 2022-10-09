import './Team.css';
import {useState} from "react";

function Team(props) {
    let [strength, setStrength] = useState(100);
    let [accuracy, setAccuracy] = useState(0.5);

    return (
        <div className="team">
            <span className="team-id text">{props.teamId}</span>
            <span className="team-name text">{props.name}</span>
            <div className="stats">
                <span className="stren text">{strength}</span>
                <span className="accur text">{accuracy*100}%</span>
            </div>
        </div>
    );
}

export default Team;
