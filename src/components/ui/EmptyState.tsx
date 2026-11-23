import type { ReactNode } from 'react';

type EmptyStateProps = {
  message: string;
  icon?: ReactNode;
};

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center text-gray-500 dark:text-neutral-400">
      {icon && <div className="text-3xl">{icon}</div>}
      <p className="text-base">{message}</p>
    </div>
  );
}

export default EmptyState;