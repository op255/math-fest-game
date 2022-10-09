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
    };


    return (
        <div className="bottom-bar-container">
            <div className="bottom-bar">
                <input type="text" className="team-name-inp text" placeholder="Имя комманды" value={teamName} onChange={handleChange}/>
                <button className="add-team" onClick={addTeam}>+</button>
            </div>
        </div>
    );
}

export default BottomBar;
