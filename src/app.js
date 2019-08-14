import React from 'react'
import { render } from 'react-dom'
import Container from './component/Container'

function App() {
  return (
    <div>
      Hello
      <Container />
    </div>
  )
}

render(<App />, document.getElementById('app'))

/*
Inside React, make call to https://jsonplaceholder.typicode.com/todos to retrieve 100 todos with shape
{ userId, id , title, completed }
Display the items that are not completed for each user
- if time allows, toggle between completed and not completed todos
*/