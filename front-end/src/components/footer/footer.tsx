import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FooterSection } from 'models';
import { ResponsiveIcon } from 'components';
import { usePeopleStore } from 'hooks';

type Props = { sections: FooterSection[] };

export function Footer(props: Props) {
    const location = useLocation();
    const { count } = usePeopleStore();

    const { sections } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isSelected = (uri: string): boolean => {
        if (uri === location.pathname) {
            return true;
        } else if (
            uri === '/people' &&
            location.pathname.match(/\/people\/\b(?!factory\b)\w+/g)
        ) {
            return true;
        }

        return false;
    };

    return (
        <footer className="footer footer-center bg-base-300 text-base-content fixed bottom-0 z-40 md:hidden">
            <div className="text-white w-full">
                <nav className="w-full">
                    <ul className="flex justify-between">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="w-full flex"
                                onClick={() => navigate(section.uri)}
                            >
                                <li
                                    className={`relative w-full cursor-pointer ${
                                        isSelected(section.uri) && 'bg-base-100'
                                    }`}
                                >
                                    <div className="flex items-center justify-center flex-col px-2 py-3 hover:bg-black hover:bg-opacity-20">
                                        <ResponsiveIcon
                                            icon={section.icon}
                                            className="text-slate-400"
                                        />

                                        {section.uri === '/people' && (
                                            <div className="absolute top-7 badge badge-xs badge-secondary">
                                                {count}
                                            </div>
                                        )}

                                        <span className="self-center text-slate-300 mt-2 max-w-[3rem] xs:max-w-[12rem] truncate text-xs">
                                            {t(section.label)}
                                        </span>
                                    </div>
                                </li>

                                {index < sections.length - 1 && (
                                    <li className="h-full self-center border-[.05rem] border-base-100"></li>
                                )}
                            </div>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
