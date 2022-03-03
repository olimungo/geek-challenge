import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLanguage, MdArrowDropDown } from 'react-icons/md';
import { languages } from 'models/language';

type Props = {};

export function LanguageSelector(props: Props) {
    // const {} = props;
    const { i18n } = useTranslation();
    const [currentKey, setCurrentKey] = useState(i18n.language);

    const handleLanguageSelected = (key: string) => {
        setCurrentKey(key);
        i18n.changeLanguage(key);
    };

    return (
        <div className="dropdown dropdown-hover dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
                <MdLanguage size={'1.5rem'} className="mr-2" />{' '}
                {` ${currentKey}`}
                <MdArrowDropDown size={'1.5rem'} />
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
            >
                {languages.map((language) => (
                    <li key={language.key}>
                        <div
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
