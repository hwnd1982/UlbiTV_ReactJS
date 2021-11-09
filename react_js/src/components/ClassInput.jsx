import React from "react";

class ClassInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Введите текст...'
    }
  }
  render() {
    return (
      <div>
        <h1> {this.state.value}</h1>
        <input
          type="text"
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
        />
      </div>
    )
  }
}

export default ClassInput;
