import { Reducer, useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import ErrorMessage from "./components/ErrorMessage";

import type { ActionTypes, StateTypes } from "./types";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState: StateTypes = {
  questions: [],
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  error: null,
  highScore: 0,
  secondsRemaining: null,
};

const SEC_PER_QUESTION = 30;

const reducer: Reducer<StateTypes, ActionTypes> = (state, action) => {
  const selectedQuestion = state.questions.at(state.currentIndex);

  switch (action.type) {
    case "DataRecieved":
      return { ...state, questions: action.payload, status: "ready" };

    case "DataFailed":
      return { ...state, error: action.payload };

    case "active":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };

    case "NewAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === selectedQuestion?.correctOption
            ? state.points + selectedQuestion.points
            : state.points,
      };

    case "NextQuestion":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };

    case "Finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "RestartQuizz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };

    case "Tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("No Action Match");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    error,
    currentIndex,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "DataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "DataFailed", payload: err }));
  }, []);

  const totalQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "error" && <ErrorMessage Message={error || ""} />}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen
            numOfQuestions={totalQuestions}
            showQuestions={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numOfQuestion={totalQuestions}
              currentIndex={currentIndex}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              Question={questions[currentIndex]}
              Dispatch={dispatch}
              Answer={answer}
            />
            <Footer>
              <Timer Dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                Dispatch={dispatch}
                Answer={answer}
                currentIndex={currentIndex}
                numOfQuestion={totalQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            maxPoints={maxPoints}
            points={points}
            highScore={highScore}
            Dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
