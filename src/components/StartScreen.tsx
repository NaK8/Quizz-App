import type { DispatchFuncType } from "../types";

interface StartScreenTypes {
  numOfQuestions: number;
  showQuestions: DispatchFuncType;
}

const StartScreen = ({ numOfQuestions, showQuestions }: StartScreenTypes) => {
  return (
    <div className="start">
      <h2>Welcome to the react quizz</h2>
      <h3>{numOfQuestions} questions to taste your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => showQuestions({ type: "active" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
