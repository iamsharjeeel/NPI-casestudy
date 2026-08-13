import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-tight transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none";

const variants = {
  primary:
    "bg-gradient-primary text-primary-foreground shadow-primary hover:shadow-glow motion-safe:hover:scale-[1.02]",
  secondary:
    "bg-card/60 border border-border/60 text-foreground hover:bg-card hover:border-border",
  ghost: "text-muted-foreground hover:text-foreground",
};

const sizes = {
  md: "h-10 px-5 text-sm",
  lg: "h-14 px-10 text-lg",
};

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  conic?: boolean;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  conic = false,
  className = "",
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  const button = (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
  if (!conic) return button;
  return <span className="conic-border inline-flex rounded-md">{button}</span>;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  conic = false,
  className = "",
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const link = (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
  if (!conic) return link;
  return <span className="conic-border inline-flex rounded-md">{link}</span>;
}
