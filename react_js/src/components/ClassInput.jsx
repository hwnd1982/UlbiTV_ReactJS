import React from "react";

class ClassInput extends React.Component {
  constructor(props) {
    super(props);
    this.defState = 'Введите текст...';
    this.state = {
      value: this.defState
    };
  }
  render() {
    return (
      <div>
        <h1> {this.state.value}</h1>
        <input
          type="text"
          placeholder={this.defState}
          value={this.state.value !== this.defState ? this.state.value : ''}
          onFocus={event => {
            if (this.state.value === this.defState) {
              event.target.value = '';
            }
          }}
          onChange={event => {
            if (!event.target.value) {
              this.setState({ value: this.defState });
            }
            else this.setState({ value: event.target.value });
          }}
        />
      </div>
    )
  }
}

export default ClassInput;
