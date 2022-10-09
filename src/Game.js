import './Game.css';
import Team from "./Team";

function Game() {
    return (
        <div className="game">
            <div className="container">
                <div className="inner">
                    <Team teamId={1} name={'UPS'}></Team>
                    <Team teamId={2} name={'UPS asdfasdf'}></Team>
                    <Team teamId={3} name={'UPS dasfasd asdfads'}></Team>
                </div>
            </div>
        </div>
    );
}

export default Game;
