import axios from 'axios';

function SongFound(props) {

    return (
        <section>
            <li className="choices__item">
                <p id={props.trackId} className="choices__song">
                    <b>Song:</b> {props.trackName},
                </p>
                <p id={props.artistId} className="choices__artist">
                    <b>Artist:</b> {props.artistName}
                </p>
            </li>
        </section>
    );
}
export default SongFound