import './App.css';
import { About, Home, PeopleEdit, PeopleList } from 'pages';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'components';
import { Suspense, useEffect, useState } from 'react';
import { Person, sortPeople } from 'models';

function App() {
    const [people, setPeople] = useState<Person[]>([]);

    const getPeople = () => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people`
        )
            .then((response) => response.json())
            .then((people: Person[]) => setPeople(people.sort(sortPeople)));
    };

    useEffect(() => {
        getPeople();
    }, []);

    const handleSearch = (pattern: string) => {
        if (pattern) {
            fetch(
                `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people/search/${pattern}`
            )
                .then((response) => response.json())
                .then((people) => setPeople(people));
        } else {
            getPeople();
        }
    };

    return (
        <Suspense fallback="...is loading">
            <div className="mt-[5rem]">
                <Header />

                <div className="h-100">
                    <Routes>
                        <Route path="/people/:id" element={<PeopleEdit />} />
                        <Route
                            path="/people"
                            element={
                                <PeopleList
                                    people={people}
                                    onSearch={handleSearch}
                                />
                            }
                        />
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
