import './BottomBar.scss';
import {useState} from "react";


function BottomBar() {
    const [teamName, setTeamName ] = useState('');

    const handleChange = (event) => {
        setTeamName(event.target.value);
    };
    const addTeam = () => {
        document.getElementById('game').dispatchEvent(new CustomEvent('add-team', {detail: teamName}));
        setTeamName('');
        document.getElementById('name-inp').focus();
    };


    return (
        <div className="bottom-bar-container">
            <div className="bottom-bar">
                <input type="text"
                       id="name-inp"
                       className="team-name-inp text"
                       placeholder="Имя комманды"
                       value={ teamName }
                       onChange={ handleChange }
                       onKeyDown={(event) => { event.key === 'Enter' && addTeam() }}
                />
                <button className="add-team" onClick={ addTeam }>+</button>
            </div>
        </div>
    );
}

export default BottomBar;
