import { ComponentProps, PropsWithChildren } from "react";

type Props = ComponentProps<"input">;

export function TextInput({ ...props }: PropsWithChildren<Props>) {
  return <input type="text" {...props} className="border" />;
}
