

const Button = ({onClick, color, text}) => {
  return (
    <div>
      <button onClick={onClick} className = "btn" style={{backgroundColor: color}}>{text}</button>
    </div>
  )
}

export default Button
