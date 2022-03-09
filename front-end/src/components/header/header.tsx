import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdMenu } from 'react-icons/md';
import { ImLab } from 'react-icons/im';
import { LanguageSelector } from 'components';
import { usePeopleStore } from 'hooks';

type Props = {};

export function Header(props: Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
        <div className="navbar bg-base-100 shadow-xl rounded-box fixed top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown dropdown-hover z-40">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle flex mr-7"
                    >
                        <MdMenu size="1.5rem" />
                    </label>

                    <ul
                        tabIndex={0}
                        className="p-2 shadow menu menu-compact dropdown-content bg-base-300 rounded-md w-52"
                    >
                        <li>
                            <div onClick={() => navigate('/home')}>
                                {t('header.homepage')}
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/people')}>
                                {t('header.people')}
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/people/factory')}>
                                {t('header.people-factory')}
                            </div>
                        </li>
                        <li>
                            <div onClick={() => navigate('/about')}>
                                {t('header.about')}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center">
                    <ImLab size="1.3rem" className="mr-3" />

                    {displayBrand && (
                        <label className="normal-case text-2xl">
                            {t('header.title')}
                        </label>
                    )}
                </div>
            </div>

            <div className="navbar-center">
                <div className="text-xl text-slate-500 flex items-center">
                    {title}

                    {displayCount && (
                        <div className="badge badge-secondary ml-2">
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
