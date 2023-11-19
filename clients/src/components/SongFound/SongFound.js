import axios from 'axios';
import "./SongFound.scss"

function SongFound(props) {
// console.log(props.index)
let backgroundStyle = "";
if(props.index % 2 ==0){
    backgroundStyle = "even";
    console.log("even: ", props.index)
} else {
    backgroundStyle = "odd";
    console.log("odd: ", props.index)
}
console.log("backgroundStyle: ",backgroundStyle)

    return (
        <section className="choices">
            <li className= {"choices__item " + backgroundStyle}>
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