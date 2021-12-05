import './CharacterCard.css'

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <ul className="attributes">
        {Object.keys(character).map((key) => {
          return key !== 'url' ? (
            <li key={key}>
              <p>
                {key}: {character[key]}
              </p>
            </li>
          ) : (
            <></>
          )
        })}
      </ul>
      <div style={{ backgroundImage: `url('${character.url}')` }} className="character-image"></div>
    </div>
  )
}

export default CharacterCard
