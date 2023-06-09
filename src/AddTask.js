import React, { Component } from 'react';

class AddTask extends Component {
  state = {
    title: '',
    description: '',
    date: ''
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, date } = this.state;
    if (title.trim() !== '') {
      this.props.onAddTask({ title, description, date });
      this.setState({ title: '', description: '', date: '' });
    }
  };

  render() {
    const { title, description, date } = this.state;

    return (
      <form className="add-task-form" onSubmit={this.handleSubmit}>
        <input
          type="text" className="add-task-input"
          name="title"
          value={title}
          onChange={this.handleChange}
          placeholder="Title"
          required
        />
        <textarea
          type="text"  className="add-task-input"
          name="description"
          value={description}
          onChange={this.handleChange}
          placeholder="Description"
        ></textarea>
        <input
          type="date" className="add-task-input"
          name="date"
          value={date}
          onChange={this.handleChange}
          required
        />
        <button className="add-task-button" type="submit">
          Add Task
        </button>
      </form>
    );
  }
}

export default AddTask;
