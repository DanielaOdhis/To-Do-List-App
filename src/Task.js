import React, { Component } from 'react';
import './App.css';

class Task extends Component {
  state = {
    isEditing: false,
    editedTitle: '',
    editedDescription: '',
    editedStartDate: '',
    editedEndDate:''
  };

  handleEditTask = () => {
    const {
      isEditing,
      editedTitle,
      editedDescription,
      editedStartDate,
      editedEndDate
    } = this.state;

    if (isEditing) {
      const trimmedTitle = editedTitle ? editedTitle.trim() : '';
      const trimmedDescription = editedDescription ? editedDescription.trim() : '';
      const trimmedStartDate = editedStartDate ? editedStartDate.trim() : '';
      const trimmedEndDate = editedEndDate ? editedEndDate.trim() : '';

      this.props.onEditTask(this.props.task.id, {
        title: trimmedTitle,
        description: trimmedDescription,
        startDate: trimmedStartDate,
        endDate: trimmedEndDate
      });

      this.setState({
        isEditing: false,
        editedTitle: '',
        editedDescription: '',
        editedStartDate: '',
        editedEndDate: ''
      });
    } else {
      this.setState({
        isEditing: true,
        editedTitle: this.props.task.title,
        editedDescription: this.props.task.description,
        editedStartDate: this.props.task.startDate,
        editedEndDate: this.props.task.endDate
      });
    }
  };
  handleDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
  };

  handleCompleteTask = () => {
    const { task } = this.props;
    const completedDate = task.completed ? '' : new Date().toLocaleDateString();
    this.props.onCompleteTask(task.id, completedDate);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { task } = this.props;
    const {
      isEditing,
      editedTitle,
      editedDescription,
      editedStartDate,
      editedEndDate
    } = this.state;

    if (isEditing) {
      return (
        <div className="task">
          <label>Title:</label>
          <input
            type="text"
            name="editedTitle"
            value={editedTitle}
            onChange={this.handleChange}
          />
          <label>Description:</label>
          <textarea
            name="editedDescription"
            value={editedDescription}
            onChange={this.handleChange}
          />
          <label>Start Date:</label>
          <input
            type="date"
            name="editedStartDate"
            value={editedStartDate}
            onChange={this.handleChange}
          />
          <label>End Date:</label>
          <input
            type="date"
            name="editedEndDate"
            value={editedEndDate}
            onChange={this.handleChange}
          />
          <button onClick={this.handleEditTask}>Save</button>
        </div>
      );
    }

    return (
      <div className="filter-b">
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={this.handleCompleteTask}
          />
          <span>{task.title}</span>
        </label>
        <div className="task-buttons">
          <button onClick={this.handleEditTask}>Edit</button>
          <button onClick={this.handleDeleteTask}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Task;
