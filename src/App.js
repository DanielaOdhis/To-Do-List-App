import React, { Component } from 'react';
import './App.css';
import AddTask from './AddTask';
import Task from './Task';

class ToDoList extends Component {
  state = {
    tasks: [],
    filter: 'all'
  };

  handleAddTask = (task) => {
    const { tasks } = this.state;
    const newTask = {
      id: tasks.length + 1,
      title: task.title,
      description: task.description,
      startDate: task.date,
      completed: false,
      completedDate: ''
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask]
    }));
  };

  handleDeleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id)
    }));
  };

  handleCompleteTask = (id, completedDate) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedDate: completedDate
            }
          : task
      )
    }));
  };

  handleEditTask = (taskId, updatedTask) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    }));
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  getFilteredTasks = () => {
    const { tasks, filter } = this.state;
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'incomplete':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  render() {
    const { filter } = this.state;
    const filteredTasks = this.getFilteredTasks();

    return (
      <div className='container'>
        <h1>To-Do List</h1>
        <AddTask onAddTask={this.handleAddTask} />
        <div className='filter-buttons'>
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => this.handleFilterChange('all')}
            disabled={filter === 'all'}
          >
            All
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => this.handleFilterChange('completed')}
            disabled={filter === 'completed'}
          >
            Completed
          </button>
          <button
            className={filter === 'incomplete' ? 'active' : ''}
            onClick={() => this.handleFilterChange('incomplete')}
            disabled={filter === 'incomplete'}
          >
            Incomplete
          </button>
        </div>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onCompleteTask={this.handleCompleteTask}
              onDeleteTask={this.handleDeleteTask}
              onEditTask={this.handleEditTask}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    );
  }
}

export default ToDoList;
