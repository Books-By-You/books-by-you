import React from 'react';
import './Button.scss';

interface Props {
  styleName: string;
  label: string;
  handleClick: (e: any) => void;
}

const Button: React.FC<Props> = ({ styleName, label, handleClick }) => {
  const className = `button ${styleName}`;
  return (
    <button type='button' className={className} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
