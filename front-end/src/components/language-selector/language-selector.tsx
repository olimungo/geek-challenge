import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage, MdArrowDropDown } from 'react-icons/md';
import { languages } from 'models';
import { ResponsiveIcon } from 'components';

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const [currentKey, setCurrentKey] = useState(i18n.language);
    const ul = useRef<HTMLUListElement>(null);

    const handleLanguageSelected = (key: string) => {
        setCurrentKey(key);
        i18n.changeLanguage(key);
        ul.current?.blur();
    };

    return (
        <div className="dropdown dropdown-end pr-2">
            <label tabIndex={0} className="btn btn-sm btn-ghost flex">
                <div className="text-sm sm:text-lg mr-1">{` ${currentKey}`}</div>

                <ResponsiveIcon icon={MdArrowDropDown} />
            </label>

            <ul
                tabIndex={0}
                ref={ul}
                className="dropdown-content menu p-1 shadow bg-base-300 rounded-lg mt-2 mr-2"
            >
                {languages.map((language) => (
                    <li key={language.key}>
                        <div
                            className="text-md md:text-lg py-2 px-10 md:px-16"
                            onClick={() => handleLanguageSelected(language.key)}
                        >
                            {language.label}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
