import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

export function Quiz({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
  onQuizStart,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("option");
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
    setSelectedAnswer(a);
    setClassName("option active");
    delay(3000, () =>
      setClassName(a.correct ? "option correct" : "option wrong"),
    );
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };
  return (
    <div>
      {/* when get in to after username */}
      {showWelcome && (
        <div className="start">
          <div className="welcomeUser">
            <p>Hey, Username! Let's start...</p>
            {showQuestionLabel && (
              <p className="after3s">Question No: 1</p>
            )}
          </div>
        </div>
      )}
      {/* start quiz, if correct - play correctAnswer with text of earned money after correctAnswer sound play sound letsPlay with text of Question No, if wrong play wrongAnswer with text of earned money after wrongAnswer sound play sound end with text of Thnak you */}
      {!showWelcome && (
        <div className="quiz">
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
        </div>
      )}
    </div>
  );
}

export default Quiz;
