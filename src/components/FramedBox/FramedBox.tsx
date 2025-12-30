import styles from "./FramedBox.module.css";

interface FramedBoxProps {
  children: React.ReactNode;
  title?: string;
  titleSize?: "small" | "medium" | "large";
  frameColor?: "green" | "white";
  titleStyle?: "rounded" | "square";
  titleClassName?: string;
  contentFrameStyle?: "rounded" | "square";
  className?: string;
  contentClassName?: string;
}

export const FramedBox = ({
  className = "",
  title,
  titleSize = "medium",
  frameColor = "green",
  titleStyle = "rounded",
  titleClassName = "",
  contentFrameStyle = "rounded",
  children,
  contentClassName = "",
}: FramedBoxProps) => {
  return (
    <div className={`${styles[frameColor]} ${styles["framed-box"]} ${className}`}>
      {title && (
        <div className={`${styles[titleStyle]} ${styles["framed-box-title"]} ${styles[titleSize]} ${titleClassName}`}>
          {title}
        </div>
      )}
      <div className={`${styles[contentFrameStyle]} ${styles["framed-box-content"]} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
