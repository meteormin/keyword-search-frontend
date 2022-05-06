import React from 'react';
import { Component } from 'react';

export type InputProp = {
  type: 'text' | 'email' | 'password';
  label: string;
  id: string;
  name: string;
  value: any;
};

export type ButtonProp = {
  classes: string[];
  type: 'submit' | 'reset' | 'button';
  text: string;
};

export type FormProps = {
  method: string;
  action: string;
  inputs: InputProp[];
  button: ButtonProp;
};

export class DynamicForm extends Component<FormProps> {
  makeInput(input: InputProp) {
    return (
      <div className="form-group">
        <label htmlFor={input.id}>{input.label}</label>
        <input
          className="form-control"
          type={input.type}
          name={input.name}
          id={input.id}
          value={input.value || ''}
        />
      </div>
    );
  }

  makeButton(btn: ButtonProp) {
    const btnClass = btn.classes.join(' ');
    return (
      <button type={btn.type} className={btnClass}>
        {this.props.button.text}
      </button>
    );
  }

  initElements() {
    const inputs = this.props.inputs;
    const elements = [];

    for (const input of inputs) {
      elements.push(this.makeInput(input));
    }
    elements.push(<br />);
    elements.push(this.makeButton(this.props.button));

    return elements;
  }

  render() {
    return (
      <form action={this.props.action} method={this.props.method}>
        {this.initElements()}
      </form>
    );
  }
}
