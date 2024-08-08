import { useState } from "react";


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ( {text, value} ) => {
    let setPercentage = false
    if (text === "Positive") {
        setPercentage = true
    }
    return(
        <tr>
            <td>{text}</td>
            <td>{value} {setPercentage && '%'}</td>
        </tr>
    )
}

const Statistics = ({ feedbacks }) => {
    const { good,neutral, bad, total } = feedbacks

    if (!total) return <p>No feedback given</p>

    return (
        <section>
            <table>
                <tbody>
                    <StatisticLine text='Good' value={good}/>
                    <StatisticLine text='Neutral' value={neutral}/>
                    <StatisticLine text='Bad' value={bad}/>
                    <StatisticLine text='All' value={total}/>
                    <StatisticLine text='Average' value={good - bad / total}/>
                    <StatisticLine text='Positive' value={good / total * 100}/>
                </tbody>
            </table>
            
        </section>
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
