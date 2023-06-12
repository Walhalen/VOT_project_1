import Button from "./Button"


const Header = ({title, onClick}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button text="Add" color="green" onClick={onClick}/>
        </header>
    )
}

export default Header
