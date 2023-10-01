import { Preloader } from "konsta/react";

export function Loading() {
  return (
    <div className="mt-4 flex">
      <Preloader className="m-auto text-primary" />
    </div>
  );
}
