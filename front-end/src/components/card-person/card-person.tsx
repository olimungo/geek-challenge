import { Person } from 'models';

type Props = { data: Person; onSelect: (id: string) => void };

export function CardPerson(props: Props) {
    const { data, onSelect } = props;

    return (
        <div
            className="bg-slate-600 text-slate-300 my-3 sm:my-7 shadow-md rounded-md cursor-pointer"
            key={data.id}
            onClick={() => onSelect(data.id)}
        >
            <div className="flex justify-center text-xl sm:text-2xl py-3 sm:py-5">
                {data.firstname} {data.lastname}
            </div>

            {(data.address || data.city || data.country) && (
                <div className="text-md sm:text-lg flex justify-between rounded-b-md text-gray-400 bg-gray-700 py-2 px-3 sm:py-4 sm:px-5">
                    <div>{data.address}</div>

                    <div className="w-60">
                        <div>{data.city}</div>
                        <div>{data.country}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
