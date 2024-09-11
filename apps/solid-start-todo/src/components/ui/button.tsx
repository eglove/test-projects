import type { PolymorphicProps } from "@kobalte/core/polymorphic";

// eslint-disable-next-line barrel/avoid-namespace-import,sonar/no-wildcard-import
import * as ButtonPrimitive from "@kobalte/core/button";
import { cva, type VariantProps } from "class-variance-authority";
import { type JSX, splitProps, type ValidComponent } from "solid-js";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-10",
        lg: "h-11 rounded-md px-8",
        sm: "h-9 rounded-md px-3",
      },
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
    },
  },
);

type ButtonProperties<T extends ValidComponent = "button"> = {
  children?: JSX.Element;
  class?: string;
} &
ButtonPrimitive.ButtonRootProps<T> & VariantProps<typeof buttonVariants>;

const Button = <T extends ValidComponent = "button">(
  properties: PolymorphicProps<T, ButtonProperties<T>>,
) => {
  const [local, others] = splitProps(properties as ButtonProperties, ["variant", "size", "class"]);
  return (
    <ButtonPrimitive.Root
      class={cn(buttonVariants({
        size: local.size,
        variant: local.variant,
      }), local.class)}
      {...others}
    />
  );
};

export type { ButtonProperties as ButtonProps };
export { Button, buttonVariants };
