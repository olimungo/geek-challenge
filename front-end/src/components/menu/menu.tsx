import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResponsiveIcon } from 'components';
import { SectionGroup } from 'models';
import { usePeopleStore } from 'hooks';

type Props = { sectionGroups: SectionGroup[] };

export function Menu(props: Props) {
    const { sectionGroups } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { count } = usePeopleStore();

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
        <div className="bg-base-300 h-full flex justify-center overflow-auto">
            <div className="w-8/12 md:w-10/12 mt-10">
                <h1 className="text-2xl xs:text-3xl md:text-4xl mb-3 md:mb-5 md:hidden">
                    Menu
                </h1>

                {sectionGroups.map((sectionGroup) => (
                    <div key={sectionGroup.label}>
                        <h2 className="text-lg xs:text-2xl text-slate-400">
                            {t(sectionGroup.label)}
                        </h2>

                        <ul tabIndex={0} className="p-2 menu menu-compact">
                            {sectionGroup.sections.map((section) => (
                                <li
                                    key={section.label}
                                    className={`flex text-base sm:text-md ${
                                        isSelected(section.uri) &&
                                        'bg-base-100 rounded-md'
                                    }`}
                                    onClick={() => navigate(section.uri)}
                                >
                                    <div className="w-full">
                                        <ResponsiveIcon
                                            icon={section.icon}
                                            className="text-slate-400"
                                        />
                                        {t(section.label)}

                                        {section.uri === '/people' && (
                                            <div className="badge badge-sm badge-secondary mr-2">
                                                {count}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="pb-24 md:hidden"></div>
            </div>
        </div>
    );
}
