/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState } from 'react'
import UserInputField from '../../components/user-input-field/UserInputField'
import CharacterCard from '../../components/character-card/CharacterCard'
import Paginator from '../../components/paginator/Paginator'
import fetchCharacters from '../../services/swapiService'
import fetchWikiImage from '../../services/fetchWikiImage'
import mungeCharacter from '../../utils/mungeCharacter'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [film, setFilm] = useState('all')
  const [filter, setFilter] = useState('people')
  const [query, setQuery] = useState('')
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [nextResultsPage, setNextResultsPage] = useState('')

  const handleSetCriteria = (value, field) => {
    if (field === 'searchInput') setSearchInput(value)
    if (field === 'film') setFilm(value)
    if (field === 'filter') setFilter(value)
  }

  const handleSubmit = () => {
    setQuery(searchInput)
    setSearchInput('')
  }

  const handleChangePage = (direction) => {
    if (direction === 'left' && currentPage > 1) setCurrentPage((prev) => prev - 1)
    if (direction === 'right' && currentPage < characters.length) setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    async function preFetchCharacters() {
      const nextBatch = await fetch(nextResultsPage)
      const json = await nextBatch.json()
      setNextResultsPage(json.next)
      const mungedCharacters = json.results.map((character) => mungeCharacter(character, filter))
      const result = await Promise.all(
        mungedCharacters.map(async (character) => {
          const wikiImage = await fetchWikiImage(character.name)
          character.url = wikiImage.url
          return character
        })
      )
      setCharacters((prev) => [...prev, ...result])
    }
    if (currentPage === characters.length - 1 && nextResultsPage) {
      preFetchCharacters()
    }
  }, [currentPage])

  useEffect(() => {
    async function getCharacters() {
      setLoading(true)
      const res = await fetchCharacters({ name: query, type: filter })
      setNextResultsPage(res.next)
      const mungedCharacters = res.results.map((character) => mungeCharacter(character, filter))
      const result = await Promise.all(
        mungedCharacters.map(async (character) => {
          const wikiImage = await fetchWikiImage(character.name)
          character.url = wikiImage.url
          return character
        })
      )
      setLoading(true)
      setCurrentPage(1)
      setCharacters(result)
      setLoading(false)
    }
    getCharacters()
  }, [query, filter])

  return (
    <div className="App">
      <h1>Character Compendium</h1>
      <UserInputField
        film={film}
        searchInput={searchInput}
        filter={filter}
        handleChange={handleSetCriteria}
        handleSubmit={handleSubmit}
      />
      <Paginator
        handleClick={handleChangePage}
        isFirst={currentPage === 1}
        isLast={currentPage === characters.length}
      />
      {loading ? <p>Loading</p> : <CharacterCard character={characters[currentPage - 1]} />}
    </div>
  )
}

export default App
