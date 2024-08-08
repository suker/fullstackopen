const Header = (props) => {
    console.log(props)
    return (
      <h1>{props.name}</h1>
    ) 
  }
  
const Part = (props) => {
return (
    <p>{props.part.name} {props.part.exercises}</p>
)
}
  
const Content = (props) => {
return (
    <div>
    <Part part={ props.parts[0] } />
    <Part part={ props.parts[1] } />
    <Part part={ props.parts[2] } />
    </div>
)
}
  
const Total = (props) => {
return (
    <h4>Total of {props.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
    </h4>
)
}

const Course = ( {course} ) => {
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
    )
}

export default Course;