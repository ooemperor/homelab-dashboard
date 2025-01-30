/**
 * Rendering of the TopNavBar
 * @author ooemperor
 */

export default function TopNavBar() {
    return (
        <header className="navbar navbar-expand-lg bd-navbar sticky-top bg-secondary text-white">
            <nav
                className="container-xxl bd-gutter flex-wrap flex-lg-nowrap">
                <div className="bd-navbar-toggle">
                    <button className={"navbar-toggler p-2"} data-bs-toggle="offcanvas" data-bs-target="#sideNavBar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                             className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
                <a className="navbar-brand p-0 me-0 me-lg-2" href="/" aria-label="Bootstrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                         className="bi bi-house" viewBox="0 0 16 16">
                        <path
                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                    </svg>
                </a>
                <div className={"d-flex"}></div>
                <div className="offcanvas-lg offcanvas-end flex-grow-1" id="bdNavbar"
                     aria-labelledby="bdNavbarOffcanvasLabel" data-bs-scroll="true">
                    <div className={"offcanvas-body"}>
                        <ul className={"navbar-nav bd-navbar-nav flex-row flex-wrap"}>
                            <li className={"nav-item col-6 col-lg-auto"}><a className={"nav-link px-0 py-2 px-lg-2"}
                                                                            href="/">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}