import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const difficulty = 3;
  const grid = renderGridByDifficulty(difficulty);
  const [isClicked, setIsClicked] = useState(grid);
  console.log(`isClicked`, isClicked);
  console.log(`typeod(isClicked)`, typeof (isClicked));

  // useEffect(() => {
  //   setIsClicked(grid);
  //   console.log(`isClicked in the useEffect`, isClicked);
  // },[])

  function highlightCells() {

  }

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

  function handleClick() {
    console.log('clicked')
    // const randomNumOne = Math.random()
  }

  function handleChange(name) {
    setIsClicked((prevState) => {
      return prevState.map((item) => {
        console.log(`item`, item);
        console.log(`name`, name);
        if(item.id === name) {
          return {
            ...item,
            isClicked: !item.isClicked
          }
        }
        return item;
      })
    });
  }

  function renderCells() {
    console.log(`isClicked rendercells`, isClicked);

    return isClicked.map((cell) => {
      return (
        <div
          key={cell.id}
          id={cell.id}
          style={{
            height: 50, flexGrow: 1,
            width: '33%', backgroundColor: cell.isClicked ? 'green' : 'orange', border: 'solid 1px black',
          }}
          onClick={() => handleChange(cell.id)}
        >

        </div>
      );
    });
  }


  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={handleClick}>Start</button>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderCells()}
      </div>

    </div>
  );
}

export default App;
