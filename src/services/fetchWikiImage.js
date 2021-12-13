import characters from '../imageUrls/characters.json'
import vehicles from '../imageUrls/vehicles.json'
import planets from '../imageUrls/planets.json'

export default function fetchWikiImage(name) {
  const allCharacters = [...characters, ...vehicles, ...planets]

  for (let i = 0; i < allCharacters.length; i++) {
    if (allCharacters[i].name === name) {
      return allCharacters[i].url
    }
  }

  return 'image not available'
}
