export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export type ActionTypes =
  | {
      type: "DataRecieved";
      payload: Question[];
    }
  | {
      type: "DataFailed";
      payload: string;
    }
  | {
      type: "active" | "NextQuestion" | "Finished" | "RestartQuizz" | "Tick";
    }
  | {
      type: "NewAnswer";
      payload: number;
    };

export type Status = "loading" | "error" | "ready" | "active" | "finished";

export interface StateTypes {
  questions: Question[];
  status: Status;
  currentIndex: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
  error: null | string;
  Error?: Error;
}

export type DispatchFuncType = (value: ActionTypes) => void;
