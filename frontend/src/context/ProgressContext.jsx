import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

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

    case "SET_PROGRESS":
      return action.payload;

    default:
      return state;
  }
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : initialState;
  });

  // ⭐ guest → localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("progress", JSON.stringify(state));
    }
  }, [state, user]);

  // ⭐ auth → load from backend
  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:3001/api/progress", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "SET_PROGRESS",
            payload: {
              completedSongs: res.data.completedSongs.reduce(
                (acc, f) => ({ ...acc, [f]: true }),
                {}
              ),
              completedExercises: res.data.completedExercises.reduce(
                (acc, f) => ({ ...acc, [f]: true }),
                {}
              ),
            },
          });
        });
    }
  }, [user]);

  // ⭐ ACTIONS
  const completeSong = async (file) => {
    dispatch({ type: "COMPLETE_SONG", payload: file });

    if (user) {
      await axios.post(
        "http://localhost:3001/api/progress/song",
        { file },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }
  };

  const completeExercise = async (file) => {
    dispatch({ type: "COMPLETE_EXERCISE", payload: file });

    if (user) {
      await axios.post(
        "http://localhost:3001/api/progress/exercise",
        { file },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        completeSong,
        completeExercise,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
