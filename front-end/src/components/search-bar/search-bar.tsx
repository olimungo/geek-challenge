import { ChangeEvent, FormEvent, useState } from 'react';
import { MdSearch } from 'react-icons/md';

type Props = { onSearch: (pattern: string) => void };

export function SearchBar(props: Props) {
    const dummyCallback = () => true;
    const { onSearch = dummyCallback } = props;
    const [pattern, setPattern] = useState('');

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        onSearch(pattern);
    };

    return (
        <form onSubmit={handleSearch} className="fixed">
            <div className="form-control">
                <label className="input-group input-group-sm sm:input-group-md">
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered input-sm sm:input-md sm:w-96"
                        value={pattern}
                        onChange={(event) => setPattern(event.target.value)}
                    />
                    <span>
                        <MdSearch size="1.5rem" onClick={handleSearch} />
                    </span>
                </label>
            </div>
        </form>
    );
}
