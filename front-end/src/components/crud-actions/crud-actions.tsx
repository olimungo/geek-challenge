import { useEffect, useState } from 'react';
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
    const [toConfirm, setToConfirm] = useState(false);
    const [toConfirmTimer, setToConfirmTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        return () => {
            if (toConfirmTimer) {
                clearTimeout(toConfirmTimer);
            }
        };
    }, [toConfirmTimer]);

    const handleConfirm = () => {
        const timer = setTimeout(() => {
            setToConfirm(false);
        }, 2000);

        setToConfirmTimer(timer);
        setToConfirm(true);
    };

    return (
        <div>
            <div className="justify-between card-actions">
                <button
                    className="btn btn-sm sm:btn-md"
                    type="button"
                    onClick={onCancel}
                >
                    <MdArrowBack size="1.3rem" className="mr-2" /> CANCEL
                </button>

                <div className="flex items-center">
                    {showDelete && !toConfirm && (
                        <button
                            type="button"
                            className="btn btn-sm sm:btn-md btn-secondary flex items-center mr-5"
                            onClick={handleConfirm}
                        >
                            <MdDelete size="1.3rem" className="mr-2" /> DELETE
                        </button>
                    )}

                    {toConfirm && (
                        <button
                            type="button"
                            className="btn btn-sm sm:btn-md btn-secondary flex items-center mr-5"
                            onClick={onDelete}
                        >
                            <RiCheckDoubleFill size="1.3rem" className="mr-2" />{' '}
                            CONFIRM
                        </button>
                    )}

                    <button
                        className="btn btn-sm sm:btn-md btn-primary"
                        type="submit"
                    >
                        <MdCheck size="1.3rem" className="mr-2" /> SAVE
                    </button>
                </div>
            </div>
        </div>
    );
}
