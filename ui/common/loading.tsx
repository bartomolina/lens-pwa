import { Preloader } from "konsta/react";

export function Loading() {
  return (
    <div className="mt-4 flex">
      <Preloader size="w-5 h-5" className="m-auto" />
    </div>
  );
}
