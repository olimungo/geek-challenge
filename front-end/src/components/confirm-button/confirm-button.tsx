import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCheckDoubleFill } from 'react-icons/ri';

type Props = {
    label: string;
    icon: JSX.Element;
    onConfirm: () => void;
};

export function ConfirmButton(props: Props) {
    const dummyCallback = () => true;
    const { t } = useTranslation();
    const { label, icon, onConfirm = dummyCallback } = props;
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

    const handleConfirmed = () => {
        if (toConfirmTimer) {
            clearTimeout(toConfirmTimer);
        }

        setToConfirm(false);
        onConfirm();
    };

    return (
        <>
            {!toConfirm && (
                <button
                    type="button"
                    className="btn btn-sm sm:btn-md btn-secondary flex items-center"
                    onClick={handleConfirm}
                >
                    <div className="mr-2">{icon}</div>

                    {label}
                </button>
            )}

            {toConfirm && (
                <button
                    type="button"
                    className="btn btn-sm sm:btn-md btn-secondary flex items-center"
                    onClick={handleConfirmed}
                >
                    <RiCheckDoubleFill size="1.3rem" className="mr-2" />{' '}
                    {t('confirm-button.confirm')}
                </button>
            )}
        </>
    );
}
