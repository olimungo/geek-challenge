import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdMenu } from 'react-icons/md';
import { LanguageSelector } from 'components';

type Props = {};

export function Header(props: Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
            </div>

            <div className="navbar-center">
                <label className="normal-case text-xl">
                    {t('header.title')}
                </label>
            </div>

            <div className="navbar-end">
                <LanguageSelector />
            </div>
        </div>
    );
}
