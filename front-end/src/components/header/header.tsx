import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImLab } from 'react-icons/im';
import { LanguageSelector } from 'components';
import { usePeopleStore } from 'hooks';

type Props = {};

export function Header(props: Props) {
    const { t } = useTranslation();
    const { people } = usePeopleStore();
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [displayCount, setDisplayCount] = useState(false);
    const [displayBrand, setDisplayBrand] = useState(false);

    useEffect(() => {
        setTitle('');
        setDisplayCount(false);
        setDisplayBrand(true);

        if (location.pathname === '/people') {
            setTitle(t('people.list.title'));
            setDisplayCount(true);
            setDisplayBrand(false);
        } else if (location.pathname === '/people/factory') {
            setTitle(t('people.factory.title'));
            setDisplayBrand(false);
        } else if (location.pathname.match(/\/people\//g)) {
            setTitle(t('people.edit.title'));
            setDisplayBrand(false);
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
                <div className="text-slate-500 flex items-center">
                    <div className="text-lg xm:text-xl">{title}</div>

                    {displayCount && (
                        <div className="badge badge-sm sm:badge-md badge-secondary ml-2">
                            {people.length}
                        </div>
                    )}
                </div>
            </div>

            <div className="navbar-end">
                <LanguageSelector />
            </div>
        </div>
    );
}
