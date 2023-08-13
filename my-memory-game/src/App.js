import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const difficulty = 3;
  const grid = renderGridByDifficulty(difficulty);
  const [isClicked, setIsClicked] = useState(grid);
  const [startGame, setStartGame] = useState(false);
  const [answer, setAnswer] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [message, setMessage] = useState('')

  // const isCorrect = answer.slice().sort().every(function (value, index) {
  //   return value === selectedAnswerSorted[index];
  // });

  useEffect(() => {
    function flashCells() {
      return answer.map((num) => {
        return handleChange(num);
      });
    }

    flashCells();
    setTimeout(flashCells, 2000);
  }, [answer])

  useEffect(() => {
    if(difficulty === selectedAnswer.length) {
      const selectedAnswerSorted = selectedAnswer.length > 0 && selectedAnswer.slice().sort();
      const isCorrect = answer.slice().sort().every(function (value, index) {
        return value === selectedAnswerSorted[index];
      });
      isCorrect ? setMessage('You win!') : setMessage('Sorry, try again')
      setAnswer([]);
    }

  }, [answer, selectedAnswer])


  function renderGridByDifficulty(difficulty) {
    let grid = [];

    for (let i = 0; i < difficulty * difficulty; i++) {
      const cell = {
        id: i,
        isClicked: false,
      };
      grid.push(cell);
    }

    return grid;
  }


  let answerArr = [];
  function handleGenerateRandomNumbers(difficulty) {
    const randomNum = Math.floor(Math.random() * (difficulty * difficulty));

    if (answerArr.length < difficulty) {
      if (answerArr.includes(randomNum)) {
        handleGenerateRandomNumbers(difficulty);
      } else {
        answerArr.push(randomNum);
        handleGenerateRandomNumbers(difficulty);
      }
    }

    console.log(`answerArr`, answerArr);
    setAnswer(answerArr);

  }

  function handleStartClick() {
    setStartGame(true);
    setAnswer([]);
    setSelectedAnswer([]);
    handleGenerateRandomNumbers(difficulty);

  }

  function handleChange(name) {
    setIsClicked((prevState) => {
      return prevState.map((item) => {
        if (item.id === name) {
          return {
            ...item,
            isClicked: !item.isClicked,
          };
        }
        return item;
      });
    });
  }

  function selectAnswer(name) {
    handleChange(name);
    setSelectedAnswer(selectedAnswer.concat(name));
  }


  function renderCells() {
    return isClicked.map((cell) => {
      let cellColor;

      if (startGame) {
        if (cell.isClicked) {
          cellColor = 'red';
        } else {
          cellColor = 'blue';
        }
      } else {
        cellColor = 'gray';
      }


      return (
        <div
          key={cell.id}
          id={cell.id}
          style={{
            height: 50, flexGrow: 1,
            width: '33%', backgroundColor: cellColor, border: 'solid 1px black',
          }}
          onClick={() => selectAnswer(cell.id)}
        />
      );
    });
  }


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={handleStartClick}>Start</button>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCells()}
      </div>

      {(startGame) && (<h1>{message}</h1>)}
      {/*{(startGame && randomNumbers.length === answers.length && !isCorrect) && (<h1>Sorry, try again!</h1>)}*/}

    </div>
  );
}

export default App;
