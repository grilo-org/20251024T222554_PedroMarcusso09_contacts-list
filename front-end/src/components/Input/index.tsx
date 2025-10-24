import React, { ForwardRefRenderFunction } from 'react';
import { StyledInput, ErrorMessage } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: { message?: string };
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { error, ...rest },
  ref,
) => {
  return (
    <div>
      <StyledInput ref={ref} {...rest} />
      {error && error.message && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

export default React.forwardRef(Input);
