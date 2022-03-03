import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { MdArrowBack, MdCheck, MdDelete } from 'react-icons/md';

type Props = {
    showDelete?: boolean;
    onCancel?: () => void;
    onDelete?: () => void;
};

export function CrudActions(props: Props) {
    const dummyCallback = () => true;
    const { t } = useTranslation();
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
                    <MdArrowBack size="1.3rem" className="mr-2" />{' '}
                    {t('crud-actions.cancel')}
                </button>

                <div className="flex items-center">
                    {showDelete && !toConfirm && (
                        <button
                            type="button"
                            className="btn btn-sm sm:btn-md btn-secondary flex items-center mr-5"
                            onClick={handleConfirm}
                        >
                            <MdDelete size="1.3rem" className="mr-2" />{' '}
                            {t('crud-actions.delete')}
                        </button>
                    )}

                    {toConfirm && (
                        <button
                            type="button"
                            className="btn btn-sm sm:btn-md btn-secondary flex items-center mr-5"
                            onClick={onDelete}
                        >
                            <RiCheckDoubleFill size="1.3rem" className="mr-2" />{' '}
                            {t('crud-actions.confirm')}
                        </button>
                    )}

                    <button
                        className="btn btn-sm sm:btn-md btn-primary"
                        type="submit"
                    >
                        <MdCheck size="1.3rem" className="mr-2" />{' '}
                        {t('crud-actions.save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
