import { useState } from "react";


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Total = ( { total }) => <p>all {total}</p>
const Average = ( {feedbacks, total} ) => {

    if (!total) {
        return (<p>No average yet</p>)
    }
    return (
        <p>average {feedbacks/total}</p>
    )
}
const Positive = ( { goodFeedback, total }) => {
    if (!goodFeedback || !total) return <p>No positive feedback yet :(</p>
    return (
        <p>Positive {goodFeedback/total*100} %</p>
    )
}

const Statistics = ({ feedbacks }) => {
    const { good,neutral, bad, total } = feedbacks

    if (!total) return <p>No feedback given</p>

    return (
        <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <Total total={total}/>
            <Average feedbacks={good - bad} total={total}/>
            <Positive goodFeedback={good} total={total}/>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const handleGoodFeedback = () => {
        const goodFeedback = good + 1
        setGood(goodFeedback)
        const totalFeedback = goodFeedback + bad + neutral
        setTotal(totalFeedback)
        console.log("total:", totalFeedback)
    }
    const handleNeutralFeedback = () => {
        const neutralFeedback = neutral + 1
        setNeutral(neutralFeedback)
        const totalFeedback = neutralFeedback + bad + good
        setTotal(totalFeedback)
        console.log("total:", totalFeedback)
    }
    const handleBadFeedback = () => {
        const badFeeback = bad + 1
        setBad(badFeeback)
        const totalFeedback = badFeeback + neutral + good
        setTotal(totalFeedback)
        console.log("total:", totalFeedback)
    }


    return (
        <main>
            <h1>Give Feedback</h1>
            <Button onClick={handleGoodFeedback} text='good'/>
            <Button onClick={handleNeutralFeedback} text='neutral'/>
            <Button onClick={handleBadFeedback} text='bad'/>
            <h2>Statistics</h2>
            <Statistics feedbacks={{good, neutral, bad, total}}/>
        </main>
    )
}

export default App;
