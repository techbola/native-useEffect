import { useState, useEffect } from 'react'

const Stopwatch = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      Time: {time}
    </div>
  )
}

function App() {
  const [names, setNames] = useState([]);
  // const [selectedName, setSelectedName] = useState(null);
  const [selectedNameDetails, setSelectedNameDetails] = useState(null)

  useEffect(() => {
    fetch("/names.json").then((response) => {
      response.json().then((data) => {
        setNames(data);
      })
    })
  }, [])

  // useEffect(() => {
  //   if (selectedName) {
  //     fetch(`/${selectedName}.json`).then((response) => {
  //       response.json().then((data) => {
  //         setSelectedNameDetails(data);
  //       })
  //     })
  //   }
  // }, [selectedName])

  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`).then((response) => {
      response.json().then((data) => {
        setSelectedNameDetails(data);
      })
    })
  }

  return (
    <div>
      <div>
        {names.map((name) => <button onClick={() => onSelectedNameChange(name)}>{name}</button>)}
      </div>
      <div>
        {JSON.stringify(selectedNameDetails)}
      </div>
      <Stopwatch />
    </div>
  )
}

export default App
