import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ColorVariant = "default" | "primary" | "secondary" | "destructive";

interface AvatarProps {
  src: string;
  alt?: string;
  fallback: string;
}

interface ChipProps extends React.ComponentPropsWithoutRef<typeof Badge> {
  label: string;
  icon?: React.ReactNode;
  avatar?: AvatarProps;
  color?: ColorVariant;
}

const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  avatar,
  color = "default",
  className,
  ...props
}) => {
  const getColorClasses = (variant: ColorVariant): string => {
    switch (variant) {
      case "primary":
        return "bg-primary text-primary-foreground hover:bg-primary/90";
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium",
        "max-w-full",
        getColorClasses(color),
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {avatar && (
        <Avatar className="size-4 mr-2">
          <AvatarImage src={avatar.src} alt={avatar.alt || label} />
          <AvatarFallback>{avatar.fallback}</AvatarFallback>
        </Avatar>
      )}
      <span className="font-Mont font-bold text-xs">{label}</span>
    </Badge>
  );
};

export default Chip;
export type { ChipProps };
