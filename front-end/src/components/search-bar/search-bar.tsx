import { FormEvent, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';

type Props = { onSearch: (pattern: string) => void };

export function SearchBar(props: Props) {
    const dummyCallback = () => true;
    const { onSearch = dummyCallback } = props;
    const [pattern, setPattern] = useState('');
    const [size, setSize] = useState(checkSize());

    function checkSize() {
        if (window.innerWidth < 640) {
            return '1.3rem';
        } else {
            return '2.3rem';
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

    return (
        <form onSubmit={handleSearch} className="fixed">
            <div className="p-[.2rem] sm:p-1 bg-slate-400 rounded-xl">
                <MdSearch
                    size={size}
                    className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 text-slate-400 search-bar-size"
                />
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-sm sm:input w-60 sm:w-96 pl-8 sm:pl-14"
                    value={pattern}
                    onChange={(event) => setPattern(event.target.value)}
                ></input>
            </div>
        </form>
    );
}
