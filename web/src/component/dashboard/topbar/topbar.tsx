import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './topbar.css'

function TopBarHeader() {

    const links = [
        { text: 'Home', url: '/' },
        { text: 'About', url: '/about' },
        { text: 'Contact', url: '/contact' }
    ];
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <h3>DanySAM</h3>
                    </li>
                    {links.map(link => (
                        <li key={link.text}>
                             <Link className='navLink' to={link.url}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )

}
export default TopBarHeader;