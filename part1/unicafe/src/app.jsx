import { useState } from "react";


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistic = ( { text, result }) => <p>{text}: {result}</p>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodChoice = () => setGood(good + 1)
    const handleNeutralChoice = () => setNeutral(neutral + 1)
    const handleBadChoice = () => setBad(bad + 1)

    return (
        <main>
            <h1>Give Feedback</h1>
            <Button onClick={handleGoodChoice} text='good'/>
            <Button onClick={handleNeutralChoice} text='neutral'/>
            <Button onClick={handleBadChoice} text='bad'/>
            <h2>Statistics</h2>
            <Statistic text='good' result={good}/>
            <Statistic text='neutral' result={neutral}/>
            <Statistic text='bad' result={bad}/>

        </main>
    )
}

export default App;
