interface ProgressBarProps {
  currentIndex: number;
  numOfQuestion: number;
  points: number;
  maxPoints: number;
  answer: number | null;
}

const ProgressBar = ({
  currentIndex,
  numOfQuestion,
  points,
  maxPoints,
  answer,
}: ProgressBarProps) => {
  return (
    <header className="progress">
      <progress
        value={currentIndex + Number(answer !== null)}
        max={numOfQuestion}
      />
      <p>
        Question <strong>{currentIndex + 1}</strong>/{numOfQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </header>
  );
};

export default ProgressBar;
