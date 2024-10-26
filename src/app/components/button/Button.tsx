"use client";

import styles from './style.module.scss';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  background?: string;
}

const Button = ({ text, type = "button", onClick, background }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      className={styles.button}
      onClick={onClick}
      style={{ background }}
      disabled={pending}
    >
      {pending ? "Carregando..." : text}
    </button>
  );
};

export default Button;