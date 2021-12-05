import './CharacterCard.css'
const staticBoba = {
  name: 'Boba Fett',
  height: '183',
  mass: '78.2',
  films: [
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/5/',
  ],
}

function CharacterCard({
  attributes = staticBoba,
  imageUrl = 'https://upload.wikimedia.org/wikipedia/en/3/3e/FettbobaJB.png',
}) {
  const imageStyle = { backgroundImage: `url('${imageUrl}')` }
  return (
    <div className="character-card">
      <ul className="attributes">
        {Object.keys(attributes).map((key) => (
          <li key={key}>
            <p>
              {key}: {mungeCharacterData(key, attributes[key])}
            </p>
          </li>
        ))}
      </ul>
      <div style={imageStyle} className="character-image"></div>
    </div>
  )
}

function mungeCharacterData(key, attribute) {
  const intToRoman = (int) => {
    return ['I', 'II', 'III', 'IV', 'V', 'VI'][+int - 1]
  }

  if (key === 'films') {
    return attribute.map((url) => intToRoman(url[28])).join(', ')
  } else return attribute
}

export default CharacterCard
