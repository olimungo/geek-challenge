import { MdArrowBack, MdCheck, MdDelete } from 'react-icons/md';
import { RiCheckDoubleFill } from 'react-icons/ri';

type Props = {
    showDelete?: boolean;
    onCancel?: () => void;
    onDelete?: () => void;
};

export function CrudActions(props: Props) {
    const dummyCallback = () => true;
    const {
        showDelete = true,
        onCancel = dummyCallback,
        onDelete = dummyCallback,
    } = props;

    return (
        <div>
            <div className="justify-between card-actions">
                <button
                    className="btn people-margin-right"
                    type="button"
                    onClick={onCancel}
                >
                    <MdArrowBack size="1.5rem" className="mr-2" /> CANCEL
                </button>

                <div>
                    {showDelete && (
                        <div className="dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-secondary flex mr-7"
                            >
                                <MdDelete size="1.5rem" className="mr-2" />{' '}
                                DELETE
                            </label>

                            <ul
                                tabIndex={0}
                                className="shadow menu dropdown-content bg-secondary rounded-md w-52"
                                style={{ position: 'fixed' }}
                            >
                                <li onClick={onDelete}>
                                    <div>
                                        <RiCheckDoubleFill
                                            size="1.5rem"
                                            className="mr-2"
                                        />
                                        CONFIRM
                                    </div>
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
    );
}
