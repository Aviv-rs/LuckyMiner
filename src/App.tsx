import { GamePage } from "./pages/GamePage/GamePage";
import { AppHeader } from "./components/AppHeader/AppHeader";
import styles from "./App.module.css";

export default function App() {
  return (
    <>
      <AppHeader />

      <main className={styles["app-main-content"]}>
        <GamePage />
      </main>
    </>
  );
}
