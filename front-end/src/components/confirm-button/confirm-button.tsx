import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';
import { RiCheckDoubleFill } from 'react-icons/ri';

type Props = {
    label?: string;
    onConfirm: () => void;
};

export function ConfirmButton(props: Props) {
    const dummyCallback = () => true;
    const { t } = useTranslation();
    const { label = 'DELETE', onConfirm = dummyCallback } = props;
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
        <>
            {!toConfirm && (
                <button
                    type="button"
                    className="btn btn-sm sm:btn-md btn-secondary flex items-center"
                    onClick={handleConfirm}
                >
                    <MdDelete size="1.3rem" className="mr-2" /> {label}
                </button>
            )}

            {toConfirm && (
                <button
                    type="button"
                    className="btn btn-sm sm:btn-md btn-secondary flex items-center"
                    onClick={onConfirm}
                >
                    <RiCheckDoubleFill size="1.3rem" className="mr-2" />{' '}
                    {t('confirm-button.confirm')}
                </button>
            )}
        </>
    );
}
