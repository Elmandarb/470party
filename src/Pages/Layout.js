import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link target="_blank" to="/breakout">Breakout</Link>
                    </li>
                    <li>
                        <Link target="_blank" to="/Flappy">
                            <button type="button" className="btn btn-info">Button</button>

                        </Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;