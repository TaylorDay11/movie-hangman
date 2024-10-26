import Hangman0 from '../img/Hangman-0.png';
import Hangman1 from '../img/Hangman-1.png';
import Hangman2 from '../img/Hangman-2.png';
import Hangman3 from '../img/Hangman-3.png';
import Hangman4 from '../img/Hangman-4.png';
import Hangman5 from '../img/Hangman-5.png';
import Hangman6 from '../img/Hangman-6.png';

export default function HangmanImage(prop) {

    let hangmanImg
    let hangmanAlt

    if(prop.wrongGuesses === 0){
        hangmanImg = Hangman0
        hangmanAlt = "Hangman 6 wrong guesses left"
    } else if(prop.wrongGuesses === 1){
        hangmanImg = Hangman1
        hangmanAlt = "Hangman 5 wrong guesses left"
    } else if (prop.wrongGuesses === 2) {
        hangmanImg = Hangman2
        hangmanAlt = "Hangman 4 wrong guesses left"
    } else if (prop.wrongGuesses === 3) {
        hangmanImg = Hangman3
        hangmanAlt = "Hangman 3 wrong guesses left"
    } else if (prop.wrongGuesses === 4) {
        hangmanImg = Hangman4
        hangmanAlt = "Hangman 2 wrong guesses left"
    } else if (prop.wrongGuesses === 5) {
        hangmanImg = Hangman5
        hangmanAlt = "Hangman 1 wrong guesses left"
    } else if (prop.wrongGuesses === 6) {
        hangmanImg = Hangman6
        hangmanAlt = "Hangman 0 wrong guesses left"
    }

    return (
        <img key="1" alt={hangmanAlt}  src={hangmanImg} className="hangman-img" />
    )
}