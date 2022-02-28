import React from 'react';
import './App.css';
import PeopleList from './pages/people/list/list';
import PeopleEdit from './pages/people/edit/edit';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/people/:id" element={<PeopleEdit />} />
                <Route path="/people" element={<PeopleList />} />
                <Route path="/" element={<PeopleList />} />
            </Routes>
        </div>
    );
}

export default App;
