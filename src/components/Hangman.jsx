import React from "react"
import Header from "./Header.jsx"
import HangmanImage from "./HangmanImage.jsx"
import HangmanButtons from "./HangmanButtons.jsx"
import GameOverMessage from "./GameOverMessage.jsx"
import letters from "../data/letters.js"

export default function Hangman(prop) {

  // Initialize Game
  const [wrongGuesses, setWrongGuesses] = React.useState(0)
  let isAlive = true 
  let randomNumber = Math.floor((Math.random() * 10) + 1)
  const [movie] = React.useState(prop.data.results[randomNumber].title)
 
  // turns the movie title into an array of capital letters
  const movieArray = movie.toUpperCase().split('')

  const [guessLetters, setGuessLetters] = React.useState(letters)
  let movieLetters = []
  let movieLetterId = 0

  // turns the movie into divs
  const movieDivs = movieArray.map(character => {
    // determines if the character is a letter
    let isLetter
    for (let i = 0; i < letters.length; i++){
      if(character === letters[i].letter){
        movieLetters.push(character)
        isLetter = true
        break
      }
      isLetter = false
    }
    movieLetterId++

  // creates a blank div if the character is a letter
  return isLetter ? <div key={movieLetterId - 1} className="letter"></div> : <div key={movieLetterId - 1} className="other-character">{character}</div>

  })

  const lettersToWin = movieLetters.length
  const [lettersNeededToWin, setLettersNeededToWin] = React.useState(0)
  const [movieDivsArray, setMovieDivsArray] = React.useState(movieDivs)

  // ends game if lost
  if(wrongGuesses === 6) {
    isAlive = false
  } 
  // ends game if won
  if(lettersNeededToWin === lettersToWin) {
    isAlive = false
  } 

  // creates letter buttons
  let buttonId = 0
  const letterButtons = guessLetters.map(lett => {
    buttonId++;
    return <HangmanButtons 
      key={buttonId - 1} 
      guessed={lett.guessed} 
      thisLetter={lett.letter}
      guess={() => guess(lett.id)} />
  })

  // when a letter button is pressed fire this function
  function guess(id) {

    if(isAlive === true){
      if (guessLetters[id].guessed === false) {
        // change letter guessed to true
        setGuessLetters(previous => {
          return previous.map(prev => {
            return prev.id === id ? {...prev, guessed: true} : prev
          })
        })

        // determine if letter is in the movie
        let letterIsInMovie = false
        for (let i = 0; i < movieArray.length; i++){
            if(guessLetters[id].letter === movieArray[i]){
                letterIsInMovie = true
                break
            }
        }

        if(letterIsInMovie === true){
          // add letters to movie div
          setMovieDivsArray(oldArray => {
              const newArray = []
              for(let i = 0; i < oldArray.length; i++){
                  if(movieArray[i] === guessLetters[id].letter) {
                      setLettersNeededToWin(oldValue => oldValue + 1)
                      newArray.push(<div key={i} className="letter">{guessLetters[id].letter}</div>)
                  } else {
                      newArray.push(oldArray[i])
                  }
              }
              return newArray
          })
        } else {
          setWrongGuesses(oldValue => oldValue + 1)
        }
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <HangmanImage wrongGuesses={wrongGuesses} />
      <div className="movie"> 
        {movieDivsArray}
      </div>
      <div className="buttons"> 
        {letterButtons}
      </div>
      <GameOverMessage 
        wrongGuesses={wrongGuesses} 
        lettersNeededToWin={lettersNeededToWin}
        lettersToWin={lettersToWin}
        movie={movie}
      />
    </div>
  );
}
