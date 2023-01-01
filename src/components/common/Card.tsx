import React from 'react';
import { Component } from 'react';

type CardProps = {
  header: string | React.ReactNode;
  style?: any;
  children: React.ReactNode;
};

export default class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card mb-4" style={this.props.style}>
        <div className="card-header">{this.props.header}</div>
        <div className="card-body">{this.props.children}</div>
      </div>
    );
  }
}
