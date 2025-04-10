// components/ui/badge.tsx
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Ensure this exists or replace `cn` with classNames or plain string join

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-indigo-100 text-indigo-800 border-transparent",
        success: "bg-green-100 text-green-800 border-transparent",
        warning: "bg-yellow-100 text-yellow-800 border-transparent",
        danger: "bg-red-100 text-red-800 border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
