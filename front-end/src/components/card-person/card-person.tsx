import { Person } from 'models';
import { backEnd } from 'services';
import { ResponsiveIcon } from 'components/responsive';
import { MdAlternateEmail, MdPhoneAndroid } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';

type Props = { data: Person; onSelect: (id: string) => void };

export function CardPerson(props: Props) {
    const { data, onSelect } = props;

    return (
        <div
            className="bg-slate-500 text-slate-300 my-5 sm:my-7 shadow-md rounded-md cursor-pointer"
            key={data.id}
            onClick={() => onSelect(data.id)}
        >
            <div className="flex items-center">
                <div className="avatar m-4">
                    <div className="w-16 md:w-20 rounded-full">
                        <img
                            id="avatar"
                            srcSet={`${backEnd}/avatar/${data.id}`}
                            alt="Avatar"
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center pl-3 md:pl-10">
                    <span className="text-2xl text-slate-700 truncate w-60 md:w-80">
                        {data.firstname} {data.lastname}
                    </span>

                    <div className="text-sm md:text-md mt-1 md:mt-2">
                        <div className="flex items-center">
                            <ResponsiveIcon icon={MdPhoneAndroid} size="xs" />

                            <div className="ml-2">{data.telephone}</div>
                        </div>

                        <div className="flex items-center">
                            <ResponsiveIcon icon={MdAlternateEmail} size="xs" />

                            <div className="ml-2">{data.email}</div>
                        </div>
                    </div>
                </div>
            </div>

            {(data.address || data.city || data.country) && (
                <div className="text-md flex justify-between rounded-b-md text-gray-300 bg-slate-600 py-2 px-4 md:py-3 md:px-7">
                    <div className="w-6/12">
                        <div className="flex items-center">
                            <ResponsiveIcon icon={FaMapMarkerAlt} size="sm" />
                            <div className="ml-2 truncate">{data.address}</div>
                        </div>
                    </div>

                    <div className="w-6/12">
                        <div className="truncate w-full text-right">
                            {data.city}
                        </div>
                        <div className="text-slate-400 text-right truncate">
                            {data.country}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
