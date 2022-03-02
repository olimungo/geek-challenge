import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdUpload } from 'react-icons/md';
import { Person } from 'models';
import { CrudActions } from 'components';

type State = {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    country: string;
};

const defaultState: State = {
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    country: '',
};

export function PeopleEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [state, setState] = useState<State>(defaultState);
    const [selectedFile, setSelectedFile] = useState<File>();
    const backEnd = `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}`;
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (id !== 'new') {
            fetch(`${backEnd}/people/${id}`)
                .then((response) => response.json())
                .then((person: Person) => {
                    setState((state) => ({ ...state, ...person }));
                });
        }
    }, [id, backEnd]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form) {
            fetch(`${backEnd}/people/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (selectedFile) {
                        const data = new FormData();

                        data.append('avatar', selectedFile);

                        await fetch(`${backEnd}/people/${response.id}/avatar`, {
                            method: 'POST',
                            body: data,
                        });
                    }
                })
                .then(() => navigate('/people'));
        }
    };

    const handleDelete = () => {
        fetch(`${backEnd}/people/${id}`, { method: 'DELETE' }).then(() =>
            navigate('/people')
        );
    };

    const handleUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
            setSelectedFile(files[0]);

            const img = document.getElementById('avatar') as HTMLImageElement;
            img.srcset = URL.createObjectURL(files[0]);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((state) => ({
            ...state,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form
            ref={form}
            id="form"
            className="flex flex-col items-center pt-5 sm:pt-16"
            onSubmit={handleSubmit}
        >
            <div className="card w-11/12 sm:w-[37rem] bg-base-100 card-compact shadow-xl">
                <div className="bg-slate-600">
                    <div className="my-5 mx-7 flex flex-col">
                        <div className="avatar mb-8">
                            <div className="w-24 rounded-full">
                                <img
                                    id="avatar"
                                    srcSet={`${backEnd}/people/${id}/avatar`}
                                    alt="Avatar"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="firstname"
                            >
                                First name{' '}
                                <span className="text-red-300">*</span>
                            </label>

                            <input
                                name="firstname"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={state.firstname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="lastname"
                            >
                                Last name{' '}
                                <span className="text-red-300">*</span>
                            </label>

                            <input
                                name="lastname"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={state.lastname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="address"
                            >
                                Address
                            </label>

                            <input
                                name="address"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={state.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="city"
                            >
                                City
                            </label>

                            <input
                                name="city"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={state.city}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="country"
                            >
                                Country
                            </label>

                            <input
                                name="country"
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={state.country}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mt-5">
                            <div className="indicator">
                                {selectedFile && (
                                    <span className="indicator-item badge badge-success"></span>
                                )}

                                <label className="btn btn-sm">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(event) =>
                                            handleUpload(event.target.files)
                                        }
                                    />
                                    <MdUpload className="mr-2" /> UPLOAD AVATAR
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <CrudActions
                        showDelete={id !== 'new'}
                        onCancel={() => navigate('/people')}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </form>
    );
}
