import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { FEArrowCircleOutline } from 'src/assets/Icons/Fluent';

export interface IFEBackNavigate {
  navigate: NavigateFunction
  size?: number
}

const FEBackNavigate: React.FC<IFEBackNavigate> = ({navigate, size=32}) => {
  return (
    
    <FEArrowCircleOutline
    size={size && 32}
    className="-scale-x-100 border border-secondary-500 rounded-full cursor-pointer"
    onClick={() => {
      navigate(-1);
    }}
  />
  )
}
export default FEBackNavigate;