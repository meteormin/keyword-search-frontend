import React, { ChangeEvent, Component, FocusEvent } from 'react';

export type InputProp = {
  type: 'text' | 'email' | 'password';
  label?: string;
  id: string;
  name: string;
  value: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  readonly?: boolean;
  placeholder?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => any;
};

export type InputState = InputProp;

class Input extends Component<InputProp, InputState> {
  constructor(props: InputProp) {
    super(props);
    this.state = {
      type: 'text',
      name: '',
      id: '',
      value: '',
    };
  }

  componentDidMount() {
    this.setState(this.props);
  }

  componentDidUpdate(prevProps: Readonly<InputProp>) {
    if (prevProps.value !== this.props.value) {
      this.setState(this.props);
    }
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: e.target.value,
    });

    if (this.state.onChange) {
      this.state.onChange(e);
    }
  };

  makeLabel() {
    if (this.state.label) {
      return (
        <label key={'label' + this.state.id} htmlFor={this.state.id}>
          {this.state.label}
        </label>
      );
    }
    return null;
  }

  render() {
    return (
      <div key={'div' + this.state.id} className="form-group">
        {this.makeLabel()}
        <input
          key={'input' + this.state.id}
          className="form-control"
          type={this.state.type}
          name={this.state.name}
          id={this.state.id}
          value={this.state.value || ''}
          onChange={this.onChange}
          readOnly={this.state?.readonly || false}
          placeholder={this.state.placeholder || ''}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }
}

export default Input;
