import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdSearch, MdClose } from 'react-icons/md';

type Props = {
    pattern: string;
    limit: number;
    onChange: (pattern: string) => void;
    onSearch: (pattern: string) => void;
    onReset: () => void;
    onChangeLimit: (limit: number) => void;
};

export function SearchBar(props: Props) {
    const dummyCallback = () => true;
    const {
        pattern,
        limit,
        onChange = dummyCallback,
        onSearch = dummyCallback,
        onReset = dummyCallback,
        onChangeLimit = dummyCallback,
    } = props;
    const { t } = useTranslation();
    const [size, setSize] = useState(checkSize());
    const [showReset, setShowReset] = useState(pattern !== '' ? true : false);

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

    const handleChangeLimit = (limit: number) => {
        onChangeLimit(limit);
    };

    const handleReset = () => {
        setShowReset(false);
        onReset();
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
                        onClick={handleReset}
                    >
                        <MdClose size={size} className=" text-slate-400" />
                    </button>
                )}

                <div className="flex items-center justify-between mx-1">
                    <span className="text-slate-600 sm:text-lg">Limit</span>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-600 mr-1 sm:mr-2 sm:text-lg">
                                100
                            </span>
                            <input
                                type="radio"
                                name="radio-6"
                                className="radio radio-xs sm:radio-md checked:bg-primary"
                                onChange={() => handleChangeLimit(100)}
                                defaultChecked={limit === 100}
                            />
                        </label>
                    </div>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-600 mr-1 sm:mr-2 sm:text-lg">
                                500
                            </span>
                            <input
                                type="radio"
                                name="radio-6"
                                className="radio radio-xs sm:radio-md checked:bg-primary"
                                onChange={() => handleChangeLimit(500)}
                                defaultChecked={limit === 500}
                            />
                        </label>
                    </div>

                    <div className="form-control ">
                        <label className="label cursor-pointer">
                            <span className="label-text text-slate-600 mr-1 sm:mr-2 sm:text-lg">
                                All
                            </span>
                            <input
                                type="radio"
                                name="radio-6"
                                className="radio radio-xs sm:radio-md checked:bg-primary"
                                onChange={() => handleChangeLimit(-1)}
                                defaultChecked={limit === -1}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}
