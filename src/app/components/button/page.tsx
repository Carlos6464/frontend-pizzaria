"use client"

import styles from './style.module.scss';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  background?: string; // Nova propriedade para o background
}

const Button: React.FC<ButtonProps> = ({ text, type = "button", onClick, background }) => {
  const { pending } = useFormStatus(); // Certifique-se de que essa linha está funcionando corretamente
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
