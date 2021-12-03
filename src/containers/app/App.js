import './App.css'
import { useEffect } from 'react'
import UserInputField from '../../components/user-input-field/UserInputField'
import CharacterCard from '../../components/character-card/CharacterCard'
import fetchWikiImage from '../../services/fetchWikiImage'

function App() {
  useEffect(() => {
    async function getImageUrl(name = 'boba fett') {
      const url = await fetchWikiImage(name)
      return url
    }
    getImageUrl()
    // console.log(getImageUrl())
  }, [])

  return (
    <div className="App">
      <h1>Character Compendium</h1>
      <UserInputField />
      <CharacterCard />
    </div>
  )
}

export default App
