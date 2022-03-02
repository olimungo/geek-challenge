import { Person } from 'models';

type Props = { data: Person; onSelect: (id: string) => void };

export function CardPerson(props: Props) {
    const { data, onSelect } = props;

    return (
        <div
            className="bg-slate-600 text-slate-300 shadow-md my-3 py-3 px-4 sm:my-7 sm:px-7 sm:py-5 text-md sm:text-2xl rounded-md cursor-pointer"
            key={data.id}
            onClick={() => onSelect(data.id)}
        >
            {data.firstname} {data.lastname}
        </div>
    );
}
