import type { DispatchFuncType } from "../types";

interface NextButtonProps {
  Dispatch: DispatchFuncType;
  Answer: number | null;
  currentIndex: number;
  numOfQuestion: number;
}

const NextButton = ({
  Dispatch,
  Answer,
  currentIndex,
  numOfQuestion,
}: NextButtonProps) => {
  if (Answer === null) return null;

  if (currentIndex < numOfQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => Dispatch({ type: "NextQuestion" })}
      >
        Next
      </button>
    );

  if (currentIndex === numOfQuestion - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => Dispatch({ type: "Finished" })}
      >
        Finish
      </button>
    );
};

export default NextButton;
