// email simple working completion to jwalkow@pgahq.com
// cc: bsubedi@pgahq.com

import React, { Component } from 'react'
import withStyle from 'react-jss'

const style = {
  user: {
    padding: 15,
    margin: 5,
    border: 'solid black 1px',
  },
  todo: {
    padding: 15,
    margin: 5,
  }
}

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      users: [],
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(todos => {
        const incomlpeteTodos = todos
          .filter(todo =>
            !todo.completed
            && todo.userId < 5
          )

        const users = incomlpeteTodos.reduce((acc, todo) => {
          const userId = Number(todo.userId)
          acc[userId] = {
            id: userId,
            todos: [...(acc[userId] && acc[userId].todos || []), todo]
          }
          return acc
        }, {})

        this.setState({
          todos: incomlpeteTodos,
          users: Object.values(users),
        })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        {this.state.users.map(user => (
          <div className={classes.user} key={user.id}>
            {user.todos.map(comp => (
              <div className={classes.todo} key={comp.id}>
                <p className="id">id: {comp.id}</p>
                <p className="userId">userId: {comp.userId}</p>
                <p className="title">title: {comp.title}</p>
                <p className="completed">completed: {String(comp.completed)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}



/**

<div keys=userId>
  <div key=todoId>
  ...
  </div>
</div>

 */

export default withStyle(style)(Container)
/*
Inside React, make call to https://jsonplaceholder.typicode.com/todos to retrieve 100 todos with shape
{ userId, id , title, completed }
Display the items that are not completed for each user
- if time allows, toggle between completed and not completed todos
*/