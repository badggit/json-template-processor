import { ComponentProps, PropsWithChildren } from "react";

type Props = ComponentProps<"button">;

export function Button({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <button
      type="button"
      {...props}
      className="rounded px-2 py-1 text-white bg-blue-400"
    >
      {children}
    </button>
  );
}
