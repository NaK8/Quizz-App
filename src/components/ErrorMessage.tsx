function ErrorMessage({ Message }: { Message: string }) {
  return (
    <p className="error">
      <span>💥</span> {Message}
    </p>
  );
}

export default ErrorMessage;
