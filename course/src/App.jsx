// import { useState } from 'react';

import { Note } from './components/Note'

// const Display = ({ value }) => <div>{value}</div>
// const Button = ({onClick, title}) => {
//   return <button onClick={onClick}>{title}</button>
// };

// const App = () => {
//   const [counter, setCounter] = useState(0)

//   const increaseCounter = () => setCounter(counter + 1);
//   const decreaseCounter = () => setCounter(counter - 1);
//   const resetCounter = () => setCounter(0)

//   // increase counter by 1 every 2 secs
//   // setTimeout(() => {
//   //   console.log(`Old value: ${counter}`);
//   //   setCounter(counter+1)
//   // },
//   //   2000)

//   return (
//     <main>
//       <h1>Hello world!</h1>
//       <Display counter={counter}/>
//       <Button onClick={increaseCounter} title='Increase' />
//       <Button onClick={decreaseCounter} title='Decrease' />
//       <Button onClick={resetCounter} title='Reset' />
//     </main>
//   )
// }

// A more complex state, debugging React apps (2)

// const History = (props) => {
//   if (!props.allClicks.length) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const App = () => {
//   const [right, setRight] = useState(0)
//   const [left, setLeft] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)

//   // const [clicks, setClicks] = useState({left: 0, right: 0})

//   // const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1})
//   // const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1})

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     const updateLeft = left + 1
//     setLeft(updateLeft)
//     setTotal(updateLeft + right)
//   }
//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     const updateRight = right + 1
//     setRight(updateRight)
//     setTotal(updateRight + left)
//   }

//   return (
//     <>
//       {left}
//       <Button onClick={handleLeftClick} title="Left"/>
//       <Button onClick={handleRightClick} title="Right"/>
//       {right}
//       <History allClicks={allClicks}/>
//       <p>Total clicks: {total}</p>
//     </>
//   )
// }

// const App = () => {
//   const [value, setValue] = useState(10)

//   const setToValue = (newValue) => {
//     return () => {
//     console.log('value now', newValue)  // print the new value to console
//     setValue(newValue)
//     }
//   }

//   return (
//     <div>
//       <Display value={value}/>
//       <Button onClick={setToValue(1000)} title='thousand'/>
//       <Button onClick={setToValue(1000)} title='reset'/>
//       <Button onClick={setToValue(1)} title='increment'/>
//     </div>
//   )
// }


const App = ({ notes }) => {
  return (
    <main>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => <Note key={note.id} note={note}/>)}
      </ul>
    </main>
  )
}

export default App
