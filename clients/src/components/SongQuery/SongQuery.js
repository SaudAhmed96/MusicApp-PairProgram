import "./SongQuery.scss"

function SongQuery(props) {
let backgroundStyle = "";
if(props.index % 2 ==0){
    backgroundStyle = "even";
} else {
    backgroundStyle = "odd";
}
console.log("props: ", props)

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
export default SongQuery