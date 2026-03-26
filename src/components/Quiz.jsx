import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

export function Quiz({
  username,
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  currentQuestionAmount,
  onQuizStart,
  onAnswerSelected,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("option");
  const [showCongrats, setShowCongrats] = useState(false);
  const [showNextQuestionLabel, setShowNextQuestionLabel] = useState(false);
  const [showSorry, setShowSorry] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showQuestionLabel, setShowQuestionLabel] = useState(false);
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    const labelTimer = setTimeout(() => {
      setShowQuestionLabel(true);
    }, 3000);

    const startQuizTimer = setTimeout(() => {
      setShowWelcome(false);
      if (onQuizStart) {
        onQuizStart();
      }
    }, 4000);

    return () => {
      clearTimeout(labelTimer);
      clearTimeout(startQuizTimer);
    };
  }, []);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    if (selectedAnswer) return;
    if (onAnswerSelected) onAnswerSelected();
    setSelectedAnswer(a);
    setClassName("option active");
    if (a.correct) {
      delay(1200, () => {
        correctAnswer();
        setShowNextQuestionLabel(false);
        setShowCongrats(true);
      });

      delay(6200, () => {
        if (questionNumber < data.length) {
          setShowNextQuestionLabel(true);
        }
      });

      delay(8200, () => {
        setShowCongrats(false);
        setShowNextQuestionLabel(false);
        setSelectedAnswer(null);
        setClassName("option");
        if (questionNumber >= data.length) {
          setStop(true);
        } else {
          setQuestionNumber((prev) => prev + 1);
        }
      });
    } else {
      delay(1200, () => {
        wrongAnswer();
        setShowSorry(true);
      });

      delay(8200, () => {
        setShowSorry(false);
        setStop(true);
      });
    }
  };
  return (
    <div>
      {/* when get in to after username */}
      <div className="quizcontainer">
        {showWelcome && (
          <div className="start">
            <div className="welcomeUser">
              <p>Hey, {username}! Let's start...</p>
              {showQuestionLabel && <p className="after3s">Question No: 1</p>}
            </div>
          </div>
        )}
      </div>
      {/* start quiz, if correct - play correctAnswer with text of earned money after correctAnswer sound play sound letsPlay with text of Question No, if wrong play wrongAnswer with text of earned money after wrongAnswer sound play sound end with text of Thnak you */}
      {!showWelcome && (
        <div className="quiz">
          {showCongrats ? (
            <div className="welcomeUser">
              <p>Congratulations, {username}!</p>
              <p>You earned: &#8377; {currentQuestionAmount}</p>
              {showNextQuestionLabel && (
                <p>Question No: {questionNumber + 1}</p>
              )}
            </div>
          ) : showSorry ? (
            <div className="welcomeUser">
              <p>Sorry, {username}!</p>
              <p>Wrong answer.</p>
            </div>
          ) : (
            <>
              <div className="question"> {question?.question} </div>
              <div className="options">
                {question?.options.map((a) => (
                  <div
                    key={a.text}
                    className={selectedAnswer === a ? className : "option"}
                    onClick={() => handleClick(a)}
                  >
                    {" "}
                    {a.text}{" "}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;
