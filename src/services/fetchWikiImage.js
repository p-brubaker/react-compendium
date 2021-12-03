export default async function fetchWikiImage(name) {
  const fixName = (name) =>
    name
      .split(' ')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('_')

  const wikiUrl = `https://en.wikipedia.org/wiki/${fixName(name)}`
  // const url = `https://proxy-fetch.herokuapp.com/puppeteer?url=${wikiUrl}`
  const url = `http://localhost:7890/puppeteer?url=${wikiUrl}`

  const res = await fetch(url)
  const text = await res.text()

  const imageUrlPattern = /(?<=og:image).*/
  const imageUrl = text.match(imageUrlPattern)[0].slice(11)
  return imageUrl
}
