import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from '../questions.js';
import Answers from './Answers.jsx';
import { useState } from 'react';

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    })

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer
      })

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000)
    }, 1000);
  }

  return <div id='question'>
    <QuestionTimer
      key={timer}
      timeout={timer}
      onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
      mode={answerState}
    />
    <p>{QUESTIONS[index].text}</p>
    <Answers
      answers={QUESTIONS[index].answers}
      selectedAnswer={answer.selectedAnswer}
      answerState={answerState}
      onSelect={handleSelectAnswer}
    />
  </div>
}
