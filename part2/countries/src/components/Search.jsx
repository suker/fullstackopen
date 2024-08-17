import { useState } from "react"

const Search = ({props} ) => {
    const [input, setInput] = useState('')
    const {countryFilter, setCountryFilter } = props
    const [timer, setTimer] = useState(null)

    const inputChanged = e => {
        setInput(e.target.value)
        clearTimeout(timer)
    
        const newTimer = setTimeout(() => {
            setCountryFilter(e.target.value)
        }, 500)
    
        setTimer(newTimer)
      }

    return <input value={input} onChange={inputChanged}/>
}

export default Search;