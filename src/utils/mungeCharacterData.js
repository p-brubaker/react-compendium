export function mungeCharacterData(key, attribute) {
  const intToRoman = (int) => {
    return ['I', 'II', 'III', 'IV', 'V', 'VI'][+int - 1]
  }

  if (key === 'films') {
    return attribute.map((url) => intToRoman(url[28])).join(', ')
  } else return attribute
}
