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
    return <Navigate to={rule.home} />;
  }
  return null;
};

export default Home;
