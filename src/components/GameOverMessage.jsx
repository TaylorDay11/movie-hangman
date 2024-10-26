export default function GameOverMessage(prop) {

    let youLost = false
    let youWin = false
    
    if(prop.wrongGuesses === 6){
        youLost = true
      }
    
      if(prop.lettersNeededToWin === prop.lettersToWin){
        youWin = true
      }

    return (
        <div className="game-over">
            <h2 className="lost">{youLost && "Game over. Correct answer: " + prop.movie}</h2>
            <h2 className="won">{youWin && "WOOHOO! You Won."}</h2>
        </div>
    )
}