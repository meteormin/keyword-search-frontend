import React from 'react';
import { Navigate } from 'react-router';

export interface HomeProps {
  role: string | number;
  rules: {
    role: string | number;
    home: string;
  }[];
}

const Home = (props: HomeProps) => {
  if (props.role) {
    const rule = props.rules.filter((rule) => {
      return rule.role === props.role;
    })[0];

    if (rule.home != '/') {
      return <Navigate to={rule.home} />;
    }
  }
  return <Navigate to={'/error/503'} />;
};

export default Home;
