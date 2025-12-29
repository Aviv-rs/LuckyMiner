import styles from "./FramedBox.module.css";

interface FramedBoxProps {
  children: React.ReactNode;
  title?: string;
  frameColor?: "green" | "white";
  titleStyle?: "rounded" | "square";
  contentFrameStyle?: "rounded" | "square";
  className?: string;
  contentClassName?: string;
}

export const FramedBox = ({
  className = "",
  title,
  frameColor = "green",
  titleStyle = "rounded",
  contentFrameStyle = "rounded",
  children,
  contentClassName = "",
}: FramedBoxProps) => {
  return (
    <div className={`${styles[frameColor]} ${styles["framed-box"]} ${className}`}>
      {title && <div className={`${titleStyle} ${styles["framed-box-title"]}`}>{title}</div>}
      <div className={`${styles[contentFrameStyle]} ${styles["framed-box-content"]} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
