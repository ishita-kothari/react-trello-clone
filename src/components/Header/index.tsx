import AddButton from '../AddButton'

const Header = () => (
    <header className='header'>
        <h1>My Board</h1>
        <span>
          <AddButton type="list" />
        </span>
    </header>
)

export default Header