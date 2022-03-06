import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdSearch, MdClose } from 'react-icons/md';

type Props = {
    pattern: string;
    onChange: (pattern: string) => void;
    onSearch: (pattern: string) => void;
    onReset: () => void;
};

export function SearchBar(props: Props) {
    const dummyCallback = () => true;
    const {
        pattern,
        onChange = dummyCallback,
        onSearch = dummyCallback,
        onReset = dummyCallback,
    } = props;
    const { t } = useTranslation();
    const [size, setSize] = useState(checkSize());
    const [showReset, setShowReset] = useState(false);

    function checkSize() {
        if (window.innerWidth < 640) {
            return '1.3rem';
        } else {
            return '1.9rem';
        }
    }

    useEffect(() => {
        function resize() {
            setSize(checkSize());
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        onSearch(pattern);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setShowReset(event.target.value !== '');
        onChange(event.target.value);
    };

    return (
        <form onSubmit={handleSearch} className="fixed">
            <div className="p-[.2rem] sm:p-1 bg-slate-400 rounded-xl">
                <MdSearch
                    size={size}
                    className="absolute top-2.5 left-2 sm:top-3.5 sm:left-3.5 text-slate-400 search-bar-size"
                />

                <input
                    type="text"
                    placeholder={t('search-bar.placeholder')}
                    className="input input-sm sm:input w-72 sm:w-96 px-8 sm:px-14 sm:text-xl"
                    value={pattern}
                    onChange={handleChange}
                />

                {showReset && (
                    <button
                        type="button"
                        className="btn btn-ghost btn-circle btn-xs sm:btn-sm absolute top-2 right-2 sm:top-3"
                        onClick={onReset}
                    >
                        <MdClose size={size} className=" text-slate-400" />
                    </button>
                )}
            </div>
        </form>
    );
}
