const TRIVIA_BASE_URL = "https://opentdb.com";

function decodeHtml(text = "") {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function mapTriviaQuestion(question, index) {
  const correctText = decodeHtml(question.correct_answer);
  const options = [
    ...question.incorrect_answers.map((answer) => ({
      text: decodeHtml(answer),
      correct: false,
    })),
    {
      text: correctText,
      correct: true,
    },
  ];

  return {
    id: index + 1,
    question: decodeHtml(question.question),
    options: shuffleArray(options),
  };
}
export async function fetchTriviaQuizData({
  perCategory = 50,
  difficulty = "medium",
  type = "multiple",
  finalCount = 15,
} = {}) {
  const response = await fetch(
    `${TRIVIA_BASE_URL}/api.php?amount=${perCategory}&difficulty=${difficulty}&type=${type}`,
  );
  const data = await response.json();

  if (!response.ok || data?.response_code !== 0) {
    throw new Error("Failed to fetch trivia questions");
  }

  const allQuestions = data?.results || [];
  const randomSelection = shuffleArray(allQuestions).slice(0, finalCount);
  console.log(allQuestions);

  return randomSelection.map((question, index) =>
    mapTriviaQuestion(question, index),
  );
}
