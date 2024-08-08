const Header = (props) => <h1>{props.name}</h1>

const Part = ( { part }) => <p>{part.name} {part.exercises}</p>

const Content = ( { parts }) => <div>{parts.map(
    (part) => <Part part={part} key={part.id}/>)}</div>

const Total = (props) => <h4>Total of {props.parts.reduce(
    (acc, part) => acc + part.exercises, 0)} exercises</h4>

const Course = ( {courses} ) => {
    return (
        <ul>
            {courses.map((course) => <li key={course.id}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </li>)}
        </ul>
    )
}

export default Course;