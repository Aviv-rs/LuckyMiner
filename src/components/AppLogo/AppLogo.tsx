import styles from "./AppLogo.module.css";
import logoImage from "../../assets/graphics/logo.png";

export const AppLogo = () => {
  return (
    <div className={styles["app-logo"]}>
      <img src={logoImage} alt="Lucky Miner Logo" className={styles["logo-image"]} />
    </div>
  );
};
