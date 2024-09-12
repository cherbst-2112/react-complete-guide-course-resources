import quizCompleteImage from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
  const skipped = userAnswers.filter(answer => answer === null);
  const correct = userAnswers.filter((answer, index) => QUESTIONS[index].answers[0] === answer);


  return <div id='summary'>
    <img src={quizCompleteImage}/>
    <h2>Quiz Completed!</h2>
    <div id='summary-stats'>
      <p>
        <span className='number'>{Math.round(100 * (skipped.length / userAnswers.length))}%</span>
        <span className='text'>skipped</span>
      </p>
      <p>
        <span className='number'>{Math.round(100 * (correct.length / userAnswers.length))}%</span>
        <span className='text'>correct</span>
      </p>
      <p>
        <span className='number'>{Math.round(100 * (userAnswers.length - skipped.length - correct.length) / userAnswers.length)}%</span>
        <span className='text'>incorrect</span>
      </p>
    </div>
    <ol>

      {userAnswers.map((answer, index) => {
        let cssClass = 'user-answer';

        if (answer === null) {
          cssClass += ' skipped';
        } else if (QUESTIONS[index].answers[0] === answer) {
          cssClass += ' correct';
        } else {
          cssClass += ' wrong';
        }

        return <li key={index}>
          <h3>{index + 1}</h3>
          <p className='question'>{QUESTIONS[index].text}</p>
          <p className={cssClass}>{answer ?? 'Skipped'}</p>
        </li>
      })}
    </ol>
  </div>
}
