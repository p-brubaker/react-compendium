export default function mungeCharacter(character, type) {
  const mungedCharacter = {}
  const intToRoman = (int) => {
    return ['I', 'II', 'III', 'IV', 'V', 'VI'][+int - 1]
  }

  if (type === 'people') {
    mungedCharacter.height = character.height
    mungedCharacter.mass = character.mass
  }

  if (type === 'planets') {
    mungedCharacter.climate = character.climate
    mungedCharacter.diameter = character.diameter
  }

  if (type === 'starships') {
    mungedCharacter.manufacturer = character.manufacturer
    mungedCharacter.crew = character.crew
  }
  mungedCharacter.name = character.name
  mungedCharacter.films = character.films.map((url) => intToRoman(url[28])).join(', ')

  return mungedCharacter
}
