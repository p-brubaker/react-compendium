import './Paginator.css'

function Paginator({ isFirst, isLast, handleClick }) {
  return (
    <div className="paginator">
      <button onClick={() => handleClick('left')} style={isFirst ? { color: 'grey' } : {}}>
        {'<'}
      </button>
      <button onClick={() => handleClick('right')} style={isLast ? { color: 'grey' } : {}}>
        {'>'}
      </button>
    </div>
  )
}

export default Paginator
