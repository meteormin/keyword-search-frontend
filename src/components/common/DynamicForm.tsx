import React from 'react';
import Input, { InputProp } from 'components/common/Input';

export interface ButtonProp {
  classes: string[];
  type: 'submit' | 'reset' | 'button';
  text: string;
}

export interface FormProps {
  method: string;
  action: string;
  inputs: { [key: string]: InputProp[] };
  button: ButtonProp;
}

const DynamicForm: React.FC<FormProps> = ({
  method,
  action,
  inputs,
  button,
}) => {
  const makeInput = (key: string, input: InputProp) => {
    return <Input {...input} />;
  };

  const makeButton = (btn: ButtonProp) => {
    const btnClass = btn.classes.join(' ');
    return (
      <button type={btn.type} className={btnClass}>
        {btn.text}
      </button>
    );
  };

  const initElements = () => {
    const elements = [];

    for (const key in inputs) {
      elements.push(
        <div key={key}>
          <strong>{key}</strong>
          <hr />
        </div>,
      );

      for (const index in inputs[key]) {
        elements.push(makeInput(key + index.toString(), inputs[key][index]));
      }
    }
    elements.push(<br key="br" />);
    elements.push(makeButton(button));

    return elements;
  };

  return (
    <form action={action} method={method}>
      {initElements()}
    </form>
  );
};

export default DynamicForm;
