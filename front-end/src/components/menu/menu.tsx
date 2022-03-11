import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdMenu } from 'react-icons/md';

type Props = {};

export function Menu(props: Props) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="">
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
        </div>
    );
}
