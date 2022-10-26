import './Team.scss';

function Team(props) {
    return (
        <div className={props.alive ? 'team' : 'team died'}>
            <span className="team-id text">{props.teamId}</span>
            <span className="team-name text">{props.name}</span>
            <div className="stats">
                <span className="stren text">{props.strength}</span>
                <span className="accur text">{props.accuracy*100}%</span>
            </div>
        </div>
    );
}

export default Team;
