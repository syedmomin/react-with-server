import { Link } from 'react-router-dom';
import './topbar.css'

function TopBarHeader(props:any) {

    const links = [
        { text: props.text, url: props.url },
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