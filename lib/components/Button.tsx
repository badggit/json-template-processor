import { ComponentProps, PropsWithChildren } from 'react';

type Props = ComponentProps<'button'>;

export function Button({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <button type="button" {...props} className="rounded bg-blue-400 px-2 py-1 text-white">
      {children}
    </button>
  );
}
