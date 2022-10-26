import './Game.scss';
import Team from "./Team";
import BottomBar from "./BottomBar";
import Log from './Log';
import {useState} from "react";

function Game() {
    const [teams, setTeams] = useState([]);
    const [log, setLog] = useState([]);

    const logger = (msg) => {
        setLog([...log, {id: log.length, text: msg}]);
    };

    const handleAddTeam = (teamName) => {
        setTeams(teams.concat({
            id: teams.length + 1,
            name: teamName,
            accuracy: 0.5,
            strength: 100,
            numOfHits: 2,
            numOfMiss: 2,
            alive: true
        }));
    };
    const handleStart = () => {
        setTeams(prevState => [...prevState]);
    };
    const handleShoot = (shooterId, targetId) => {
        const shooter = teams[shooterId];
        const target = teams[targetId];


        const willHit = shooter.accuracy > Math.random();

        if (willHit) {
            let damage = Math.floor(shooter.strength / 5);
            if (damage < 3) {
                damage = 3;
            }

            target.strength -= damage;
            if (target.strength <= 0) {
                target.strength = 0;
                target.alive = false;
            }

            shooter.numOfHits += 1;

            console.log('Shooter ', shooter.name, ' will hit ', target.name, ' by ', damage);
            logger(`Shooter ${shooter.name} hit ${target.name} by ${damage}`);
        }
        else {
            shooter.numOfMiss += 1;

            console.log('Shooter ', shooter.name, ' missed!');
            logger(`Shooter ${shooter.name} missed!`);
        }

        shooter.accuracy = Math.round(100 * shooter.numOfHits / (shooter.numOfHits + shooter.numOfMiss)) / 100;
        setTeams([...teams]);
    };

    return (
        <div id="game">
            <div className="container">
                <div className="inner">
                    {teams.map(team => {
                        return <Team key={team.id}
                                     teamId={team.id}
                                     name={team.name}
                                     accuracy={team.accuracy}
                                     strength={team.strength}
                                     alive={team.alive}
                        />
                    })}
                </div>
                <Log log={log} />
                <BottomBar
                    handleStart={handleStart}
                    handleShoot={handleShoot}
                    handleAddTeam={handleAddTeam}
                />
            </div>
        </div>
    );
}

export default Game;
