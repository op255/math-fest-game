import './BottomBar.scss';
import arrow from './arrow.svg';
import rightArrow from './arrow-right.svg';

import {useState} from "react";


function BottomBar() {
    const handleChangeName = (event) => {
        setTeamName(event.target.value);
    };
    const addTeam = () => {
        document.getElementById('game').dispatchEvent(new CustomEvent('add-team', {detail: teamName}));
        setTeamName('');
        document.getElementById('name-inp').focus();
    };
    const startGame = () => {
        document.getElementById('game').dispatchEvent(new CustomEvent('start=game'));
        setGameStarted(true);
        setWidth('300px');
    };

    const [teamName, setTeamName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [width, setWidth] = useState('530px');

    return (
        <div className="bottom-bar-container">
            <div className="bottom-bar" style={{width: width}}>
                {gameStarted
                    ? <div className="shot-wrapper">
                        <input type="text" className="shot-inp text"/>
                        <img src={rightArrow} alt=""/>
                        <input type="text" className="shot-inp text"/>
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
            <button className="btn bottom-btn" onClick={gameStarted ? () => {
            } : startGame}>
                <img src={arrow} alt=""/>
            </button>
        </div>
    );
}

export default BottomBar;
