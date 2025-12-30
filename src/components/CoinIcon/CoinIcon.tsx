import { BaseIcon, type BaseIconProps } from "../BaseIcon/BaseIcon";
import { Colors } from "../../constants/colors.constant";

export const CoinIcon = ({
  size = "medium",
  fillColor = Colors.AMBER_GLOW,
  strokeColor = Colors.BRIGHT_AMBER,
}: Omit<BaseIconProps, "icon">) => {
  return <BaseIcon icon="coin" size={size} fillColor={fillColor} strokeColor={strokeColor} />;
};
