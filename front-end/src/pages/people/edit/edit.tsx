import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdCheck, MdDelete, MdUpload } from 'react-icons/md';
import { RiCheckDoubleFill } from 'react-icons/ri';

type Person = {
    id: string;
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    country: string;
};

function PeopleEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [firstname, setFirstname] = useState<string | undefined>('');
    const [lastname, setLastname] = useState<string | undefined>('');
    const [address, setAddress] = useState<string | undefined>('');
    const [city, setCity] = useState<string | undefined>('');
    const [country, setCountry] = useState<string | undefined>('');
    const [selectedFile, setSelectedFile] = useState<File>();
    const backEnd = `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}`;

    useEffect(() => {
        if (id !== 'new') {
            fetch(`${backEnd}/people/${id}`)
                .then((response) => response.json())
                .then((person: Person) => {
                    setFirstname(person.firstname);
                    setLastname(person.lastname);
                    setAddress(person.address);
                    setCity(person.city);
                    setCountry(person.country);
                });
        }
    }, [id]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch(`${backEnd}/people/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                address,
                city,
                country,
            }),
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

    return (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="card w-11/12 sm:w-[37rem] bg-base-100 card-compact shadow-xl">
                <div className="bg-slate-600">
                    <div className="my-5 mx-7 flex flex-col">
                        <div className="avatar mb-8">
                            <div className="w-24 rounded-full">
                                <img
                                    id="avatar"
                                    srcSet={`${backEnd}/people/${id}/avatar`}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="firstname"
                            >
                                First name
                            </label>

                            <input
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-[7rem] inline-block"
                                htmlFor="lastname"
                            >
                                Last name
                            </label>

                            <input
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
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
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
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
                                className="input input-bordered w-full max-w-xs"
                                type="text"
                                value={country}
                                onChange={(event) =>
                                    setCountry(event.target.value)
                                }
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
                    <div className="justify-between card-actions">
                        <button
                            className="btn people-margin-right"
                            type="button"
                            onClick={() => navigate('/people')}
                        >
                            <MdArrowBack size="1.5rem" className="mr-2" />{' '}
                            CANCEL
                        </button>

                        <div>
                            {id !== 'new' && (
                                <div className="dropdown">
                                    <label
                                        tabIndex={0}
                                        className="btn btn-secondary flex mr-7"
                                    >
                                        <MdDelete
                                            size="1.5rem"
                                            className="mr-2"
                                        />{' '}
                                        DELETE
                                    </label>

                                    <ul
                                        tabIndex={0}
                                        className="shadow menu dropdown-content bg-secondary rounded-md w-52"
                                        style={{ position: 'fixed' }}
                                    >
                                        <li onClick={handleDelete}>
                                            <a>
                                                <RiCheckDoubleFill
                                                    size="1.5rem"
                                                    className="mr-2"
                                                />
                                                CONFIRM
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            <button className="btn btn-primary" type="submit">
                                <MdCheck size="1.5rem" className="mr-2" /> SAVE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PeopleEdit;
