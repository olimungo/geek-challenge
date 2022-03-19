import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImLab } from 'react-icons/im';
import { LanguageSelector, SearchBar } from 'components';

type Props = {};

export function Header(props: Props) {
    const { t } = useTranslation();
    const location = useLocation();
    const [displayBrand, setDisplayBrand] = useState(false);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);

    useEffect(() => {
        setDisplayBrand(true);
        setDisplaySearchBar(true);

        if (location.pathname.match(/\/people\b(?!\/factory\b)/g)) {
            setDisplayBrand(false);
        }

        if (location.pathname !== '/people') {
            setDisplaySearchBar(false);
        }
    }, [location.pathname, t]);

    return (
        <div className="navbar bg-base-100 shadow-xl rounded-box m-0 p-0 fixed top-0 z-50">
            <div className="navbar-start">
                <div className="flex items-center">
                    <ImLab size="1.3rem" className="mx-4 sm:mx-5" />

                    {displayBrand && (
                        <label className="normal-case text-lg sm:text-2xl">
                            {t('header.title')}
                        </label>
                    )}
                </div>
            </div>

            <div className="navbar-center">
                {displaySearchBar && <SearchBar />}
            </div>

            <div className="navbar-end">
                <LanguageSelector />
            </div>
        </div>
    );
}
