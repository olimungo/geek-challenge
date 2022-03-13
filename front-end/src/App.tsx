import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { About, Home, PeopleEdit, PeopleFactory, PeopleList } from 'pages';
import { Footer, Header, Menu, SideMenu } from 'components';
import { footerSections, sectionGroups } from 'models';
import './App.css';

function App() {
    return (
        <Suspense fallback="...is loading">
            <Header />

            <div className="h-full flex">
                <SideMenu />

                <div className="mt-16 w-full">
                    <div className="h-full">
                        <Routes>
                            <Route path="/people" element={<PeopleList />} />
                            <Route
                                path="/people/factory"
                                element={<PeopleFactory />}
                            />
                            <Route
                                path="/people/:id"
                                element={<PeopleEdit />}
                            />
                            <Route
                                path="/menu"
                                element={<Menu sectionGroups={sectionGroups} />}
                            />
                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </div>
                </div>
            </div>

            <Footer sections={footerSections} />
        </Suspense>
    );
}

export default App;
