import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
    About,
    Home,
    PageNotFound,
    PeopleEdit,
    PeopleFactory,
    PeopleList,
} from 'pages';
import { Footer, Header, HeaderTitle, Menu, SideMenu } from 'components';
import { footerSections, sectionGroups } from 'models';
import { usePeopleStore } from 'hooks';

function App() {
    const { countPeople } = usePeopleStore();
    useEffect(() => {
        countPeople();
    }, [countPeople]);

    return (
        <Suspense fallback="...is loading">
            <Header>
                <HeaderTitle>
                    <p>toto</p>
                    <p>titi</p>
                </HeaderTitle>
            </Header>

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

                            <Route
                                path="/page-not-found"
                                element={<PageNotFound />}
                            />

                            <Route
                                path="*"
                                element={
                                    <Navigate to="/page-not-found" replace />
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </div>

            <Footer sections={footerSections} />
        </Suspense>
    );
}

export default App;
