const Header = () => {
  return (
    <header>
      <div className="spacer"></div>
      <div className="title">
        <h1>Pokédex</h1>
        <h2>A Pokémon Index Built With <a href="https://reactjs.org/" target="_blank">React</a> & <a href="https://pokeapi.co/" target="_blank">PokéAPI</a></h2>
      </div>
      <div className="social">
        <a href="https://github.com/codemints" target="_blank"><i class="fa-brands fa-github-alt"></i></a>
        <a href="https://codepen.io/codemints" target="_blank"><i class="fa-brands fa-codepen"></i></a>
        <a href="https://twitter.com/iamcodemints" target="_blank"><i class="fa-brands fa-twitter"></i></a>
        <a href="https://www.linkedin.com/in/codemints/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
      </div>
    </header>
  )
}

export default Header