import styles from "./FramedBox.module.css";

interface FramedBoxProps {
  children: React.ReactNode;
  title?: string;
  frameColor?: "green" | "white";
  titleStyle?: "rounded" | "square";
  contentFrameStyle?: "rounded" | "square";
}

export const FramedBox = ({
  title,
  frameColor = "green",
  titleStyle = "rounded",
  contentFrameStyle = "rounded",
  children,
}: FramedBoxProps) => {
  return (
    <div className={`${styles[frameColor]} ${styles["framed-box"]}`}>
      {title && <div className={`${titleStyle} ${styles["framed-box-title"]}`}>{title}</div>}
      <div className={`${styles[contentFrameStyle]} ${styles["framed-box-content"]}`}>{children}</div>
    </div>
  );
};
