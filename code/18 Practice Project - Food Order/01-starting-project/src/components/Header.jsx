import logoImg from '../assets/logo.jpg';
import Button from './Button.jsx';

export default function Header() {
  return <header id='main-header'>
    <div id='title'>
      <img src={logoImg} />
      <h1>Testing</h1>
    </div>
    <nav>
      <Button textOnly>
        Cart (-1)
      </Button>
    </nav>
  </header>
}
