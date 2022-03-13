import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdUpload } from 'react-icons/md';
import { Person } from 'models';
import { CrudActions } from 'components';
import { useTranslation } from 'react-i18next';
import { usePeopleStore } from 'hooks';
import { backEnd } from 'services';

const defaultPerson: Person = {
    id: 'new',
    firstname: '',
    lastname: '',
    telephone: '',
    email: '',
    address: '',
    city: '',
    country: '',
};

export function PeopleEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<Person>(defaultPerson);
    const [selectedFile, setSelectedFile] = useState<File>();
    const { getPerson, updatePerson, uploadAvatar, deletePerson } =
        usePeopleStore();
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (id && id !== 'new') {
            getPerson(id).then((person) => setPerson(person));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (form) {
            const id = await updatePerson(person);

            if (selectedFile) {
                const data = new FormData();
                data.append('avatar', selectedFile);

                uploadAvatar(id, data);
            }

            navigate(-1);
        }
    };

    const handleDelete = () => {
        if (id) {
            deletePerson(id);
        }

        navigate(-1);
    };

    const handleUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
            setSelectedFile(files[0]);

            const img = document.getElementById('avatar') as HTMLImageElement;
            img.srcset = URL.createObjectURL(files[0]);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPerson((state) => ({
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
            <div className="card w-11/12 sm:w-[33rem] bg-slate-600 card-compact shadow-xl mb-20">
                <div className="bg-slate-500">
                    <div className="my-5 mx-7 flex flex-col">
                        <div className="avatar mb-8">
                            <div className="w-24 rounded-full">
                                <img
                                    id="avatar"
                                    srcSet={`${backEnd}/avatar/${id}`}
                                    alt="Avatar"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="firstname"
                            >
                                {t('people.edit.firstname') + ' '}
                                <span className="text-red-300">*</span>
                            </label>

                            <input
                                name="firstname"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.firstname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="lastname"
                            >
                                {t('people.edit.lastname') + ' '}
                                <span className="text-red-300">*</span>
                            </label>

                            <input
                                name="lastname"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.lastname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="telephone"
                            >
                                {t('people.edit.telephone') + ' '}
                            </label>

                            <input
                                name="telephone"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.telephone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="email"
                            >
                                {t('people.edit.email') + ' '}
                            </label>

                            <input
                                name="email"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="address"
                            >
                                {t('people.edit.address')}
                            </label>

                            <input
                                name="address"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="city"
                            >
                                {t('people.edit.city')}
                            </label>

                            <input
                                name="city"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.city}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                className="w-24 text-lg inline-block"
                                htmlFor="country"
                            >
                                {t('people.edit.country')}
                            </label>

                            <input
                                name="country"
                                className="input input-md input-bordered w-full max-w-xs"
                                type="text"
                                value={person.country}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mt-5">
                            <div className="indicator">
                                {selectedFile && (
                                    <span className="indicator-item badge badge-success"></span>
                                )}

                                <label className="btn btn-md">
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(event) =>
                                            handleUpload(event.target.files)
                                        }
                                    />
                                    <MdUpload className="mr-2" />{' '}
                                    {t('people.edit.upload')}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <CrudActions
                        showDelete={id !== 'new'}
                        onCancel={() => navigate(-1)}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </form>
    );
}
