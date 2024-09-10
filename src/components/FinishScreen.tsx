import { DispatchFuncType } from "../types";

interface FinishScreenProps {
  points: number;
  maxPoints: number;
  highScore: number;
  Dispatch: DispatchFuncType;
}

const FinishScreen = ({
  points,
  maxPoints,
  highScore,
  Dispatch,
}: FinishScreenProps) => {
  const average = (points / maxPoints) * 100;

  let emoji;
  if (average === 100) emoji = "🥇";
  if (average >= 80 && average < 100) emoji = "🎉";
  if (average >= 50 && average < 80) emoji = "🙃";
  if (average >= 0 && average < 50) emoji = "🤨";
  if (average === 0) emoji = "🤦‍♂️";

  console.log(highScore);

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(average)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => Dispatch({ type: "RestartQuizz" })}
      >
        Restart Quizz
      </button>
    </>
  );
};

export default FinishScreen;
