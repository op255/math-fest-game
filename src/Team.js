import './Team.scss';
import Avatar from 'boring-avatars';

function Team(props) {
    const accuracyText = String(props.accuracy*100).split('.')[0];

    return (
        <div className={props.alive ? 'team' : 'team died'}>
            <div className="top-part">
                <div className="avatar">
                    <Avatar
                        size={75}
                        name={props.name}
                        variant="beam"
                    />
                </div>
                <span className='team-name text'>{props.name}</span>
            </div>
            <div className="bottom-part">
                <span className='team-id text'>{props.teamId}</span>
                <div className='stats'>
                    <span className='stren text stat-item'>
                        <span className="label">Сила</span>
                        <span className="value">{props.strength}</span>
                    </span>
                    <span className='accur text stat-item'>
                        <span className="label">Точность</span>
                        <span className="value">{accuracyText}%</span>
                    </span>
                </div>
            </div>

        </div>
    );
}

export default Team;
