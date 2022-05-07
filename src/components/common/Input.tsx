import React, { ChangeEvent, Component } from 'react';
import { InputProp } from './DynamicForm';

export type InputState = InputProp;

class Input extends Component<InputProp, InputState> {
  constructor(props: InputProp) {
    super(props);
    this.state = {
      type: 'text',
      name: '',
      id: '',
      value: '',
      label: '',
    };
  }

  componentDidMount() {
    this.setState(this.props);
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div key={'div' + this.state.id} className="form-group">
        <label key={'label' + this.state.id} htmlFor={this.state.id}>
          {this.state.label}
        </label>
        <input
          key={'input' + this.state.id}
          className="form-control"
          type={this.state.type}
          name={this.state.name}
          id={this.state.id}
          value={this.state.value || ''}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default Input;
