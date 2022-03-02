import './App.css';
import { About, Home, PeopleEdit, PeopleList } from 'pages';
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();

    return (
        <div className="mt-[5rem]">
            <div className="navbar bg-base-100 shadow-xl rounded-box fixed top-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle flex mr-7"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </label>

                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-box w-52"
                        >
                            <li>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => navigate('/home')}
                                >
                                    Homepage
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => navigate('/people')}
                                >
                                    People
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => navigate('/about')}
                                >
                                    About
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="navbar-center">
                    <label className="normal-case text-xl">geekChallenge</label>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="h-100">
                <Routes>
                    <Route path="/people/:id" element={<PeopleEdit />} />
                    <Route path="/people" element={<PeopleList />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
