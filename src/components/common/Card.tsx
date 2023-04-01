import React from 'react';

type CardProps = {
    header: string | React.ReactNode;
    style?: any;
    children: React.ReactNode;
};

const Card = (props: CardProps) => {
    return (
        <div className="card mb-4" style={props.style}>
            <div className="card-header">{props.header}</div>
            <div className="card-body">{props.children}</div>
        </div>
    );
};

export default Card;
