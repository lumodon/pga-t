// email simple working completion to jwalkow@pgahq.com
// cc: bsubedi@pgahq.com

import React, { Component } from 'react'
import withStyle from 'react-jss'

const style = {
  user: {
    padding: 15,
    margin: '10px 2px',
    border: 'solid black 1px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  todo: {
    padding: 10,
    margin: 2,
    width: '40vw',
    maxWidth: 400,
    border: '1px solid #aaa',
    '& p': {
      margin: 2,
    }
  },
  userHeader: {
    fontWeight: 'bolder',
    textAlign: 'center',
    margin: '5px auto',
  },
  todosContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
  completionToggleBtn: {
    backgroundColor: '#b3c8ff',
    borderRadius: 8,
    color: '#3a85f1',
    fontSize: '2em',
    minWidth: 300,
    width: '10vw',
    margin: '10 auto',
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      users: [],
      completed: false,
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
            todo.completed === this.state.completed
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

  handleCompletionToggle = () => {
    this.setState({
      completed: !this.state.completed,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.page}>
        <button
          onClick={this.handleCompletionToggle}
          className={classes.completionToggleBtn}
        >
          Show {this.state.completed ? 'Incompleted' : 'Completed'}
        </button>
        {this.state.users.map(user => (
          <div className={classes.user} key={user.id}>
            <h3 className={classes.userHeader}>User {user.id}</h3>
            <div className={classes.todosContainer}>
              {user.todos.map(comp => (
                <div className={classes.todo} key={comp.id}>
                  <p className="id">id: {comp.id}</p>
                  <p className="title">title: {comp.title}</p>
                  <p className="completed">completed: {String(comp.completed)}</p>
                </div>
              ))}
            </div>
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