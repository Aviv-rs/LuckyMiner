import { CircleDollarSign, RotateCcw } from "lucide-react";

const iconMap = {
  coin: CircleDollarSign,
  retry: RotateCcw,
};

export interface BaseIconProps {
  icon: keyof typeof iconMap;
  size?: "small" | "medium" | "large";
  fillColor?: string;
  strokeColor?: string;
}

const sizeMap = {
  small: 16,
  medium: 24,
  large: 32,
};

export const BaseIcon = ({
  icon,
  size = "medium",
  fillColor: color = "currentColor",
  strokeColor: stroke = "currentColor",
}: BaseIconProps) => {
  const IconComponent = iconMap[icon] || <></>;
  return <IconComponent size={sizeMap[size]} fill={color} stroke={stroke} />;
};
