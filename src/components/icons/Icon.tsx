import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  children,
  size = 24,
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
