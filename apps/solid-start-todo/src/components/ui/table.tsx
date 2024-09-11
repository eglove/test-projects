import { type Component, type ComponentProps, splitProps } from "solid-js";

import { cn } from "~/lib/utils";

const Table: Component<ComponentProps<"table">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <div class="relative w-full overflow-auto">
      {/* eslint-disable-next-line sonar/table-header */}
      <table
        class={cn("w-full caption-bottom text-sm", local.class)}
        {...others}
      />
    </div>
  );
};

const TableHeader: Component<ComponentProps<"thead">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <thead
      class={cn("[&_tr]:border-b", local.class)}
      {...others}
    />
  );
};

const TableBody: Component<ComponentProps<"tbody">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <tbody
      class={cn("[&_tr:last-child]:border-0", local.class)}
      {...others}
    />
  );
};

const TableFooter: Component<ComponentProps<"tfoot">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <tfoot
      class={cn("bg-primary font-medium text-primary-foreground", local.class)}
      {...others}
    />
  );
};

const TableRow: Component<ComponentProps<"tr">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <tr
      class={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        local.class,
      )}
      {...others}
    />
  );
};

const TableHead: Component<ComponentProps<"th">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <th
      class={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        local.class,
      )}
      {...others}
    />
  );
};

const TableCell: Component<ComponentProps<"td">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <td
      class={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", local.class)}
      {...others}
    />
  );
};

const TableCaption: Component<ComponentProps<"caption">> = (properties) => {
  const [local, others] = splitProps(properties, ["class"]);
  return (
    <caption
      class={cn("mt-4 text-sm text-muted-foreground", local.class)}
      {...others}
    />
  );
};

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
