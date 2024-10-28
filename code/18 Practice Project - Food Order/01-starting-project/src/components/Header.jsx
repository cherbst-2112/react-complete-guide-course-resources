import logoImg from '../assets/logo.jpg';

export default function Header() {
  return <header id='main-header'>
    <div id='title'>
      <img src={logoImg} />
      <h1>Testing</h1>
    </div>
    <nav>
      <button>Cart (-1)</button>
    </nav>
  </header>
}
