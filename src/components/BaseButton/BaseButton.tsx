import styles from "./BaseButton.module.css";

interface BaseButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export const BaseButton = ({
  children,
  onClick,
  variant = "primary",
  fullWidth = false,
  type = "button",
  size = "medium",
}: BaseButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles["base-button"]} ${size ? styles[size] : ""} ${styles[variant]} ${fullWidth ? styles["full-width"] : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
