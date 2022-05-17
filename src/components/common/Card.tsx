import React from 'react';
import { Component } from 'react';

type CardProps = {
  header: string;
  children: JSX.Element;
};

export default class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">{this.props.header}</div>
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}
