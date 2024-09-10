import QuestionTimer from './QuestionTimer.jsx';
import QUESTIONS from '../questions.js';
import Answers from './Answers.jsx';

export default function Question({ questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer }) {
  return <div id='question'>
    <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
    <p>{questionText}</p>
    <Answers
      answers={answers}
      selectedAnswer={selectedAnswer}
      answerState={answerState}
      onSelect={onSelectAnswer}
    />
  </div>
}
