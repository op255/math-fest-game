import './Game.scss';
import Team from "./Team";
import BottomBar from "./BottomBar";
import Log from './Log';
import {useState} from "react";

function Game() {
    const [teams, setTeams] = useState([]);
    const [log, setLog] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isReadyToShoot, setIsReadyToShoot] = useState(false);

    const logger = (isHit, shooter, target = null, damage = null) => {
        setLog([...log, {id: log.length, isHit, shooter, target, damage}]);
    };

    const handleAddTeam = (teamName) => {
        setTeams(teams.concat({
            id: teams.length + 1,
            name: teamName,
            accuracy: 0.5,
            strength: 100,
            numOfHits: 3,
            numOfMiss: 3,
            alive: true
        }));
    };

    const handleSelectTeam = (event) => {
        if(!isGameStarted) {
            return;
        }

        if (isReadyToShoot && selectedTeam) {
            const targetId = Number(event.currentTarget.getAttribute('data-team-id'));

            const shooter = teams[selectedTeam - 1];
            const target = teams[targetId - 1];

            if (selectedTeam === targetId) {
                document.getElementById('game').classList.remove('team-selected');
                document.getElementById('game').classList.remove('ready-to-shoot');
                document.querySelectorAll('.team')[selectedTeam - 1].classList.remove('selected');
                setSelectedTeam(null);
                setIsReadyToShoot(false);
                return;
            }

            const willHit = shooter.accuracy > Math.random();

            if (willHit) {
                let damage = Math.floor(shooter.strength / 5);
                if (damage < 3 || target.strength <= 15) {
                    damage = 3;
                }

                target.strength -= damage;
                if (target.strength <= 0) {
                    target.strength = 0;
                    target.alive = false;
                }

                logger(true, shooter.name, target.name, damage);
            }
            else {
                logger(false, shooter.name);
            }

            setTeams([...teams]);

            document.getElementById('game').classList.remove('team-selected');
            document.getElementById('game').classList.remove('ready-to-shoot');
            document.querySelectorAll('.team')[selectedTeam - 1].classList.remove('selected');
            setSelectedTeam(null);
            setIsReadyToShoot(false);

            return;
        }

        const selectedTeamId = Number(event.currentTarget.getAttribute('data-team-id'));

        if (selectedTeam) {
            document.querySelectorAll('.team')[selectedTeam - 1].classList.remove('selected');
            setSelectedTeam(null);
            setIsReadyToShoot(false);

            if (selectedTeamId === selectedTeam) {
                document.getElementById('game').classList.remove('team-selected');
                document.getElementById('game').classList.remove('ready-to-shoot');
                return;
            }
        }

        setSelectedTeam(selectedTeamId);

        document.querySelectorAll('.team')[selectedTeamId - 1].classList.add('selected');
        document.getElementById('game').classList.add('team-selected');
    };

    const handleWrongAns = () => {
        if (!selectedTeam) {
            return;
        }

        const shooter = teams[selectedTeam - 1];

        shooter.numOfMiss += 1;
        shooter.accuracy = Math.round(100 * shooter.numOfHits / (shooter.numOfHits + shooter.numOfMiss)) / 100;
        setTeams([...teams]);

        document.querySelectorAll('.team')[selectedTeam - 1].classList.remove('selected');
        setSelectedTeam(null);

        document.getElementById('game').classList.remove('team-selected');
    };

    const handleRightAns = () => {
        setIsReadyToShoot(true);

        const shooter = teams[selectedTeam - 1];

        shooter.numOfHits += 1;
        shooter.accuracy = Math.round(100 * shooter.numOfHits / (shooter.numOfHits + shooter.numOfMiss)) / 100;

        setTeams([...teams]);
    };

    const handleStart = () => {
        setTeams(prevState => [...prevState]);
        setIsGameStarted(true);
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
            logger(true, shooter.name, target.name, damage);
            console.log(true, shooter.name, target.name, damage);
        }
        else {
            shooter.numOfMiss += 1;
            logger(false, shooter.name);
            console.log(false, shooter.name);
        }

        shooter.accuracy = Math.round(100 * shooter.numOfHits / (shooter.numOfHits + shooter.numOfMiss)) / 100;
        setTeams([...teams]);
    };

    return (
        <div id="game" className={isReadyToShoot ? 'ready-to-shoot' : ''}>
            <div className="container">
                <div className="inner">
                    {teams.map(team => {
                        return <Team key={team.id}
                                     teamId={team.id}
                                     name={team.name}
                                     accuracy={team.accuracy}
                                     strength={team.strength}
                                     alive={team.alive}
                                     handleSelectTeam={handleSelectTeam}
                        />
                    })}
                </div>
                <Log log={log} />
                <BottomBar
                    isStartDisabled={teams.length < 2}
                    handleStart={handleStart}
                    handleShoot={handleShoot}
                    handleAddTeam={handleAddTeam}
                    selectedTeam={selectedTeam}
                    isGameStarted={isGameStarted}
                    isReadyToShoot={isReadyToShoot}
                    handleWrongAns={handleWrongAns}
                    handleRightAns={handleRightAns}
                />
            </div>
        </div>
    );
}

export default Game;
