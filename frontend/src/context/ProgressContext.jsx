import { createContext, useContext, useReducer, useEffect } from "react";

const ProgressContext = createContext();

const initialState = {
  completedSongs: {},
  completedExercises: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "COMPLETE_SONG":
      return {
        ...state,
        completedSongs: {
          ...state.completedSongs,
          [action.payload]: true,
        },
      };

    case "COMPLETE_EXERCISE":
      return {
        ...state,
        completedExercises: {
          ...state.completedExercises,
          [action.payload]: true,
        },
      };

    default:
      return state;
  }
}

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(state));
  }, [state]);

  return (
    <ProgressContext.Provider value={{ state, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
