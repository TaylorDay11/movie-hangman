export default function HangmanButtons(prop) {

    let styles = {
        backgroundColor: prop.guessed ? "#8f8e8e" : "white"
    }

    return (
        <button style={styles} className="guess-letter" onClick={prop.guess}>{prop.thisLetter}</button>
    )
}