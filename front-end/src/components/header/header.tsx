import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdMenu } from 'react-icons/md';
import { ImLab } from 'react-icons/im';
import { LanguageSelector } from 'components';
// import { useStore } from 'hooks';

type Props = {};

export function Header(props: Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // const store = useStore();
    // const location = useLocation();
    // const [title, setTitle] = useState('');
    // const [badgeCount, setBadgeCount] = useState(-1);

    // useEffect(() => {
    //     if (location.pathname === '/people') {
    //         setTitle(t('people.list.title'));
    //         setBadgeCount(store.people.length);
    //     } else if (location.pathname.match(/\/people\//g)) {
    //         setTitle(t('people.edit.title'));
    //         setBadgeCount(-1);
    //     } else {
    //         setTitle('');
    //         setBadgeCount(-1);
    //     }
    // }, [location.pathname, t, store.people]);

    return (
        <div className="navbar bg-base-100 shadow-xl rounded-box fixed top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown dropdown-hover">
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
                            <div onClick={() => navigate('/about')}>
                                {t('header.about')}
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center">
                    <ImLab size="1.3rem" className="mr-3" />
                    <label className="normal-case text-2xl">
                        {t('header.title')}
                    </label>
                </div>
            </div>

            <div className="navbar-center">
                {/* <div className="text-xl text-slate-500 flex items-center">
                    {title}
                    {badgeCount !== -1 && (
                        <div className="badge badge-secondary ml-2">
                            {badgeCount}
                        </div>
                    )}
                </div> */}
            </div>

            <div className="navbar-end">
                <LanguageSelector />
            </div>
        </div>
    );
}
