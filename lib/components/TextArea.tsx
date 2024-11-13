import { ComponentProps, PropsWithChildren } from "react";

type Props = ComponentProps<"textarea">;

export function TextArea({ ...props }: PropsWithChildren<Props>) {
  return <textarea {...props} className="border" />;
}
