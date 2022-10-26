import './BottomBar.scss';
import arrow from './arrow.svg';
import rightArrow from './arrow-right.svg';
import targetIcon from './target.svg'

import {useState} from "react";


function BottomBar(props) {
    const handleChangeName = (event) => {
        setTeamName(event.target.value);
    };
    const handleChangeShooter = (event) => {
        setShooter(event.target.value);
    };
    const handleChangeTarget = (event) => {
        setTarget(event.target.value);
    };

    const addTeam = () => {
        props.handleAddTeam(teamName);
        setTeamName('');
        document.getElementById('name-inp').focus();
    };
    const startGame = () => {
        props.handleStart();
        setGameStarted(true);
        setWidth('300px');
    };
    const shoot = () => {
        props.handleShoot(parseInt(shooter) - 1, parseInt(target) - 1);
        setShooter('');
        setTarget('');
    };

    const [teamName, setTeamName] = useState('');
    const [shooter, setShooter] = useState('');
    const [target, setTarget] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [width, setWidth] = useState('530px');

    return (
        <div className="bottom-bar-container">
            <div className="bottom-bar" style={{width: width}}>
                {gameStarted
                    ? <div className="shot-wrapper">
                        <input type="text" className="shot-inp text" value={shooter} onChange={handleChangeShooter}/>
                        <img src={rightArrow} alt=""/>
                        <input type="text" className="shot-inp text" value={target} onChange={handleChangeTarget}/>
                    </div>
                    : <div>
                        <input type="text"
                               id="name-inp"
                               className="team-name-inp text"
                               placeholder="Имя комманды"
                               value={teamName}
                               onChange={handleChangeName}
                               onKeyDown={(event) => {
                                   event.key === 'Enter' && addTeam()
                               }}/>
                        <button className="btn add-team" onClick={addTeam}>+</button>
                    </div>
                }
            </div>
            <button className="btn bottom-btn" onClick={gameStarted ? shoot : startGame}>
                <img className={gameStarted ? 'target-icon' : ''} src={gameStarted ? targetIcon : arrow} alt=""/>
            </button>
        </div>
    );
}

export default BottomBar;
