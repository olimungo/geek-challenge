import './App.css';
import { About, Home, PeopleEdit, PeopleList } from 'pages';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'components';

function App() {
    return (
        <div className="mt-[5rem]">
            <Header />

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
