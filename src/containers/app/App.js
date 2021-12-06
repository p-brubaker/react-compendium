/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState, useRef } from 'react'
import UserInputField from '../../components/user-input-field/UserInputField'
import CharacterCard from '../../components/character-card/CharacterCard'
import Paginator from '../../components/paginator/Paginator'
import fetchCharacters from '../../services/swapiService'
import fetchWikiImage from '../../services/fetchWikiImage'
import mungeCharacter from '../../utils/mungeCharacter'
import { appearedInFilm } from '../../utils/helpers'
import fetchByProxy from '../../services/fetchByProxy'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [film, setFilm] = useState('all')
  const [filter, setFilter] = useState('people')
  const [query, setQuery] = useState('')
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [nextResultsPage, setNextResultsPage] = useState('')
  const [charactersByFilm, setCharactersByFilm] = useState([])

  const prevFilteredLengthRef = useRef()

  useEffect(() => {
    prevFilteredLengthRef.current = charactersByFilm.length
  })

  const prevFilteredLength = prevFilteredLengthRef.current

  const handleSetCriteria = (value, field) => {
    if (field === 'searchInput') setSearchInput(value)
    if (field === 'filter') setFilter(value)
    if (field === 'film') {
      setLoading(true)
      const filtered = characters.filter((character) => {
        return appearedInFilm(character, value)
      })
      setCharactersByFilm(filtered)
      setCurrentPage(1)
      setFilm(value)
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    setQuery(searchInput)
    setSearchInput('')
  }

  const handleChangePage = (direction) => {
    if (direction === 'left' && currentPage > 1) setCurrentPage((prev) => prev - 1)
    if (direction === 'right' && film === 'all' && currentPage < characters.length) {
      setCurrentPage((prev) => prev + 1)
    }
    if (direction === 'right' && film !== 'all' && currentPage < charactersByFilm.length) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    async function preFetchCharacters() {
      const nextBatch = await fetchByProxy({ url: nextResultsPage, method: 'GET' })
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
      if (film !== 'all') {
        const newCharactersByFilm = result.filter((character) => {
          return appearedInFilm(character, film)
        })
        setCharactersByFilm((prev) => [...prev, ...newCharactersByFilm])
      }
    }
    if (
      (currentPage === characters.length - 1 && nextResultsPage) ||
      (film !== 'all' && currentPage === charactersByFilm.length - 1 && nextResultsPage) ||
      (film !== 'all' &&
        charactersByFilm.length === prevFilteredLength &&
        currentPage === charactersByFilm.length - 1 &&
        nextResultsPage)
    ) {
      preFetchCharacters()
    }
  }, [currentPage])

  useEffect(() => {
    async function getCharacters() {
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
      if (film !== 'all') {
        const newCharactersByFilm = result.filter((character) => {
          return appearedInFilm(character, film)
        })
        setCharactersByFilm(newCharactersByFilm)
      }
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
      {loading ? (
        <p>Loading</p>
      ) : (
        <CharacterCard
          character={
            film !== 'all' ? charactersByFilm[currentPage - 1] : characters[currentPage - 1]
          }
        />
      )}
    </div>
  )
}

export default App
