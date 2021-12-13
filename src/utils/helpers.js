export function intToRoman(int) {
  return ['I', 'II', 'III', 'IV', 'V', 'VI'][+int - 1]
}

export function romanToInt(roman) {
  return ['', 'I', 'II', 'III', 'IV', 'V', 'VI'].indexOf(roman)
}

export function appearedInFilm(character, value) {
  const films = character.films.split(', ').map(romanToInt)
  return films.includes(+value)
}
