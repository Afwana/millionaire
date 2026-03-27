import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";
import { fetchTriviaQuizData } from "./utils/trivia";
import { FALLBACK_QUIZ_DATA } from "./utils/datas";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("0");
  const [quizStarted, setQuizStarted] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timerReady, setTimerReady] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "500" },
        { id: 2, amount: "1000" },
        { id: 3, amount: "2000" },
        { id: 4, amount: "3000" },
        { id: 5, amount: "4000" },
        { id: 6, amount: "5000" },
        { id: 7, amount: "10000" },
        { id: 8, amount: "25000" },
        { id: 9, amount: "50000" },
        { id: 10, amount: "75000" },
        { id: 11, amount: "100000" },
        { id: 12, amount: "125000" },
        { id: 13, amount: "250000" },
        { id: 14, amount: "500000" },
        { id: 15, amount: "1000000" },
      ].reverse(),
    [],
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  useEffect(() => {
    if (!quizStarted || stop) return;
    setTimerPaused(false);
  }, [questionNumber, quizStarted, stop]);

  useEffect(() => {
    if (!quizStarted || stop) {
      setTimerReady(false);
      return;
    }

    setTimerReady(false);
    const startTimerDelay = setTimeout(() => {
      setTimerReady(true);
    }, 8000);

    return () => clearTimeout(startTimerDelay);
  }, [quizStarted, questionNumber, stop]);

  const loadTriviaQuestions = async () => {
    try {
      setIsLoadingQuestions(true);
      const fetchedQuestions = await fetchTriviaQuizData({
        perCategory: 50,
        difficulty: "medium",
        type: "multiple",
        finalCount: 15,
      });
      if (fetchedQuestions.length >= 15) {
        setQuizData(fetchedQuestions.slice(0, 15));
      }
    } catch (error) {
      console.error("Trivia API failed, using fallback data:", error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    loadTriviaQuestions();
  }, []);

  const currentQuestionAmount =
    moneyPyramid.find((m) => m.id === questionNumber)?.amount || "0";

  const resetToStart = () => {
    setQuestionNumber(1);
    setEarned("0");
    setStop(false);
    setQuizStarted(false);
    setTimerPaused(false);
    setTimerReady(false);
    setUsername(null);
    loadTriviaQuestions();
  };

  useEffect(() => {
    if (!stop) return;
    const backToStartTimer = setTimeout(() => {
      resetToStart();
    }, 8200);

    return () => clearTimeout(backToStartTimer);
  }, [stop]);

  return (
    <div
      className="app d-flex"
      style={{ height: "100vh", backgroundColor: "#020230", color: "white" }}
    >
      {username ? (
        <>
          <div
            className="main d-flex"
            style={{ width: "75%", flexDirection: "column" }}
          >
            {stop ? (
              <h1 className="endText">
                Congratulations, {username}! Total earned: &#8377; {earned}
              </h1>
            ) : (
              <>
                {quizStarted && (
                  <div
                    className="top"
                    style={{ height: "50%", position: "relative" }}
                  >
                    {timerReady ? (
                      <div
                        className="timer"
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50%",
                          border: "5px solid #ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "30px",
                          fontWeight: "700",
                          position: "absolute",
                          bottom: "30px",
                          left: "100px",
                        }}
                      >
                        <Timer
                          setStop={setStop}
                          questionNumber={questionNumber}
                          isPaused={timerPaused}
                        />
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </div>
                )}
                <div className="bottom" style={{ height: "50%" }}>
                  {isLoadingQuestions ? (
                    <div className="welcomeUser">
                      <p>Loading quiz questions...</p>
                    </div>
                  ) : (
                    <Quiz
                      username={username}
                      data={quizData.length > 0 ? quizData : FALLBACK_QUIZ_DATA}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      currentQuestionAmount={currentQuestionAmount}
                      onQuizStart={() => setQuizStarted(true)}
                      onAnswerSelected={() => setTimerPaused(true)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div
            className="pyramid d-flex justify-content-center align-items-center"
            style={{ width: "25%" }}
          >
            <ul
              className="money"
              style={{ listStyle: "none", width: "100%", padding: "20px" }}
            >
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id ? "moneyItem active" : "moneyItem"
                  }
                >
                  <span className="moneyItemNumber"> {m.id} </span>
                  <span className="moneyItemAmount"> &#8377; {m.amount} </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
