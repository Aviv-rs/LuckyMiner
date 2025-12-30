import { FramedBox } from "../FramedBox/FramedBox";
import { CoinIcon } from "../CoinIcon/CoinIcon";
import { AnimatedCounter } from "../AnimatedTextBox/AnimatedCounter";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/local-storage.utils";
import { useEffect, useState } from "react";
import { EventBusEvents } from "../../constants/event-bus.enum";
import { eventBus } from "../../utils/event-bus.utils";
import styles from "./TotalCoinsHeader.module.css";
export const TotalCoinsHeader = () => {
  const [totalCoins, setTotalCoins] = useState<number | undefined>(
    getLocalStorageItem("TOTAL_COINS") ? Number(getLocalStorageItem("TOTAL_COINS")) : undefined,
  );

  useEffect(() => {
    eventBus.on(EventBusEvents.TOTAL_COINS_UPDATED, (data) => {
      if (typeof data === "number" && !isNaN(data)) {
        const currentTotalCoins = getLocalStorageItem("TOTAL_COINS");
        const newTotalCoins = Number(currentTotalCoins) + data;
        setTotalCoins(newTotalCoins);
        setLocalStorageItem("TOTAL_COINS", newTotalCoins.toString());
      }
    });
    return () => {
      eventBus.off(EventBusEvents.TOTAL_COINS_UPDATED);
    };
  }, []);

  useEffect(() => {
    eventBus.on(EventBusEvents.TOTAL_COINS_RESET, () => {
      setTotalCoins(0);
      setLocalStorageItem("TOTAL_COINS", "0");
    });
    return () => {
      eventBus.off(EventBusEvents.TOTAL_COINS_RESET);
    };
  }, []);
  return (
    <FramedBox title="Total Coins" frameColor="gold" className={styles["total-coins-header"]}>
      <CoinIcon />
      <AnimatedCounter countTo={totalCoins ?? 0} />
    </FramedBox>
  );
};
