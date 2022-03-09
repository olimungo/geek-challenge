import './App.css';
import { About, Home, PeopleEdit, PeopleFactory, PeopleList } from 'pages';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'components';
import { Suspense } from 'react';

function App() {
    return (
        <Suspense fallback="...is loading">
            <div className="mt-[5rem]">
                <Header />

                <div className="h-100">
                    <Routes>
                        <Route path="/people" element={<PeopleList />} />
                        <Route
                            path="/people/factory"
                            element={<PeopleFactory />}
                        />
                        <Route path="/people/:id" element={<PeopleEdit />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Suspense>
    );
}

export default App;
