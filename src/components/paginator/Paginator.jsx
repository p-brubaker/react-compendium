import './Paginator.css'

function Paginator({ isFirst = true, isLast = false }) {
  return (
    <div className="paginator">
      <button style={isFirst ? { color: 'grey' } : {}}>{'<'}</button>
      <button style={isLast ? { color: 'grey' } : {}}>{'>'}</button>
    </div>
  )
}

export default Paginator
