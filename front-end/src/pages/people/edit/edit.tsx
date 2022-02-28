import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdCheck, MdDelete } from 'react-icons/md';
import { RiCheckDoubleFill } from 'react-icons/ri';
import './edit.css';

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

    useEffect(() => {
        if (id !== 'new') {
            fetch(
                `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people/${id}`
            )
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

        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people/${id}`,
            {
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
            }
        )
            .then((res) => res.json())
            .then((res) => navigate('/people'));
    };

    const handleDelete = () => {
        fetch(
            `http://${window.location.hostname}:${process.env.REACT_APP_BACK_END_PORT}/people/${id}`,
            {
                method: 'DELETE',
            }
        ).then(() => navigate('/people'));
    };

    return (
        <form className="people-edit" onSubmit={handleSubmit}>
            <div className="people-margin-bottom">
                <label
                    className="people-label people-margin-right"
                    htmlFor="firstname"
                >
                    First name
                </label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>

            <div className="people-margin-bottom">
                <label
                    className="people-label people-margin-right"
                    htmlFor="lastname"
                >
                    Last name
                </label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>

            <div className="people-margin-bottom">
                <label
                    className="people-label people-margin-right"
                    htmlFor="address"
                >
                    Address
                </label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <div className="people-margin-bottom">
                <label
                    className="people-label people-margin-right"
                    htmlFor="city"
                >
                    City
                </label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    id="city"
                    name="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div className="people-margin-bottom">
                <label
                    className="people-label people-margin-right"
                    htmlFor="country"
                >
                    Country
                </label>
                <input
                    className="input input-bordered w-full max-w-xs"
                    id="country"
                    name="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>

            <div className="actions">
                <button
                    className="btn people-margin-right"
                    type="button"
                    onClick={() => navigate('/people')}
                >
                    <MdArrowBack size="1.5rem" className="mr-2" /> CANCEL
                </button>

                {id !== 'new' && (
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-secondary people-margin-right flex"
                        >
                            <MdDelete size="1.5rem" className="mr-2" /> DELETE
                        </label>

                        <ul
                            tabIndex={0}
                            className="shadow menu dropdown-content bg-secondary rounded-box w-52"
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
        </form>
    );
}

export default PeopleEdit;
