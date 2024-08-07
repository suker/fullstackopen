const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you're {props.age} years old</p>
    </div>
  )
}

const App = () => {

  const name = 'Carlos'
  const age = '20'

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Juan" age={age}/>
      <Hello name={name} age="18"/>
    </>
  )
}

export default App
