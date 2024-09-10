import { DispatchFuncType, Question } from "../types";

interface QuestionsProps {
  Question: Question;
  Dispatch: DispatchFuncType;
  Answer: number | null;
}

const Questions = ({ Question, Dispatch, Answer }: QuestionsProps) => {
  const hasAnswerd = Answer !== null;
  return (
    <div>
      <h4>{Question.question}</h4>
      <div className="options">
        {Question.options.map((op, i) => (
          <button
            onClick={() => Dispatch({ type: "NewAnswer", payload: i })}
            className={`btn btn-option ${i === Answer ? "answer" : ""} ${
              hasAnswerd
                ? i === Question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={i}
            disabled={hasAnswerd}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
