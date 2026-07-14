import { lazy, type ComponentType } from "react";

export default function lazyWithDelay<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  delay = 500
) {
  return lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );
}