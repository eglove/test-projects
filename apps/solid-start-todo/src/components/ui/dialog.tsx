import type { PolymorphicProps } from "@kobalte/core/polymorphic";

// eslint-disable-next-line barrel/avoid-namespace-import,sonar/no-wildcard-import
import * as DialogPrimitive from "@kobalte/core/dialog";
import { type Component, type ComponentProps, type JSX, splitProps, type ValidComponent } from "solid-js";

import { cn } from "~/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal:
Component<DialogPrimitive.DialogPortalProps> = (properties) => {
  const [, rest] = splitProps(properties, ["children"]);
  return (
    <DialogPrimitive.Portal {...rest}>
      <div class="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        {properties.children}
      </div>
    </DialogPrimitive.Portal>
  );
};

type DialogOverlayProperties<T extends ValidComponent = "div"> =
  { class?: string } & DialogPrimitive.DialogOverlayProps<T>;

const DialogOverlay = <T extends ValidComponent = "div">(
  properties: PolymorphicProps<T, DialogOverlayProperties<T>>,
) => {
  const [, rest] = splitProps(properties as DialogOverlayProperties, ["class"]);
  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        properties.class,
      )}
      {...rest}
    />
  );
};

type DialogContentProperties<T extends ValidComponent = "div"> =
  {
    children?: JSX.Element;
    class?: string;
  } & DialogPrimitive.DialogContentProps<T>;

const DialogContent = <T extends ValidComponent = "div">(
  properties: PolymorphicProps<T, DialogContentProperties<T>>,
) => {
  const [, rest] = splitProps(properties as DialogContentProperties, ["class", "children"]);
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        class={cn(
          "fixed left-1/2 top-1/2 z-50 grid max-h-screen w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto border bg-background p-6 shadow-lg duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg",
          properties.class,
        )}
        {...rest}
      >
        {properties.children}
        <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[expanded]:bg-accent data-[expanded]:text-muted-foreground">
          <svg
            class="size-4"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
          <span class="sr-only">
            Close
          </span>
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

const DialogHeader: Component<ComponentProps<"div">> = (properties) => {
  const [, rest] = splitProps(properties, ["class"]);
  return (
    <div
      class={cn("flex flex-col space-y-1.5 text-center sm:text-left", properties.class)}
      {...rest}
    />
  );
};

const DialogFooter: Component<ComponentProps<"div">> = (properties) => {
  const [, rest] = splitProps(properties, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", properties.class)}
      {...rest}
    />
  );
};

type DialogTitleProperties<T extends ValidComponent = "h2"> = {
  class?: string;
} & DialogPrimitive.DialogTitleProps<T>;

const DialogTitle = <T extends ValidComponent = "h2">(
  properties: PolymorphicProps<T, DialogTitleProperties<T>>,
) => {
  const [, rest] = splitProps(properties as DialogTitleProperties, ["class"]);
  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold leading-none tracking-tight", properties.class)}
      {...rest}
    />
  );
};

type DialogDescriptionProperties<T extends ValidComponent = "p"> =
  {
    class?: string;
  } & DialogPrimitive.DialogDescriptionProps<T>;

const DialogDescription = <T extends ValidComponent = "p">(
  properties: PolymorphicProps<T, DialogDescriptionProperties<T>>,
) => {
  const [, rest] = splitProps(properties as DialogDescriptionProperties, ["class"]);
  return (
    <DialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", properties.class)}
      {...rest}
    />
  );
};

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
