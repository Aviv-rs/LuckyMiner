import styles from "./FramedBox.module.css";

interface FramedBoxProps {
  children: React.ReactNode;
  title?: string;
  frameColor?: "green" | "white";
  titleStyle?: "rounded" | "square";
}

export const FramedBox = ({ title, frameColor = "green", titleStyle = "rounded", children }: FramedBoxProps) => {
  return (
    <div className={`${styles["framed-box"]} ${styles[frameColor]} `}>
      {title && <div className={`${titleStyle} ${styles["framed-box-title"]}`}>{title}</div>}
      <div className={styles["framed-box-content"]}>{children}</div>
    </div>
  );
};
