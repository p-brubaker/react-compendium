import './UserInputField.css'

function UserInputField() {
  const criteria = { filter: 'people', films: 'all', sortBy: 'Asc', search: '' }
  const filterOptions = ['people', 'vehicles', 'planets']
  const films = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI']
  return (
    <div className="user-input-field">
      <div className="input-field-top">
        <label htmlFor="search">
          {'search '}
          <input name="search" />
        </label>
        <label htmlFor="film">
          {'film '}
          <select name="film" value="all">
            {films.map((film, i) => (
              <option key={film} value={i + 1}>
                {film}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="input-field-bottom">
        <label htmlFor="filter">
          {'filter '}
          <select name="filter" value="people">
            {filterOptions.map((choice) => (
              <option key={choice} value={choice}>
                {choice.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="sort-by">
          {'sort by '}
          <select name="sort-by" value="asc">
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default UserInputField
