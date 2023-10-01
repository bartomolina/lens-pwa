interface ErrorProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorProps) {
  return (
    <div className="mt-4 flex">
      <span className="m-auto">{message}</span>
    </div>
  );
}
