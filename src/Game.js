import './Game.scss';
import Team from "./Team";
import BottomBar from "./BottomBar";
import {useEffect, useState} from "react";

function Game() {
    const handleAddTeam = (event) => {
      setTeams(prev => ([...prev, {id: prev.length + 1, name: event.detail}]));
    };

    useEffect(() => {
        document.getElementById('game').addEventListener('add-team', handleAddTeam);

        return () => {
            document.getElementById('game').removeEventListener('add-team', handleAddTeam);
        };
    }, []);

    const [teams, setTeams] = useState([]);

    return (
        <div id="game">
            <div className="container">
                <div className="inner">
                    {teams.map((team) => {
                        return <Team key={ team.id } teamId={ team.id } name={ team.name }></Team>
                    })}
                </div>
                <BottomBar />
            </div>
        </div>
    );
}

export default Game;
