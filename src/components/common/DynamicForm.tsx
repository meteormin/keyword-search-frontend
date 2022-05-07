import React, { Component } from 'react';
import Input from './Input';

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
  inputs: { [key: string]: InputProp[] };
  button: ButtonProp;
};

export interface FormState {
  inputs: InputProp[];
  elements: any;
}

export class DynamicForm extends Component<FormProps, FormState> {
  makeInput(key: string, input: InputProp) {
    return <Input {...input} />;
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

    for (const key in inputs) {
      elements.push(
        <div>
          <strong>{key}</strong>
          <hr />
        </div>,
      );

      for (const index in inputs[key]) {
        elements.push(
          this.makeInput(key + index.toString(), inputs[key][index]),
        );
      }
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
