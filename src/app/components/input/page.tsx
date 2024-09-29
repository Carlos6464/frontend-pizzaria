
// components/Input.tsx
import React from 'react';
import styles from './style.module.scss'; // Importe os estilos se necessário

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    type, 
    name, 
    placeholder, 
    required = false, 
    className, 
    value, 
    onChange
}) => {
    return (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={className || styles.input} // Use o estilo padrão, mas pode ser sobreposto
          value={value}
          onChange={onChange}
        />
      );
};

export default Input;