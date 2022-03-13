import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons/lib';
import { ResponsiveButton } from 'components/responsive';
import { RiCheckDoubleFill } from 'react-icons/ri';

type Props = {
    label: string;
    icon: IconType;
    className?: string;
    onConfirm: () => void;
};

export function ConfirmButton(props: Props) {
    const dummyCallback = () => true;
    const { t } = useTranslation();
    const { label, icon, className = '', onConfirm = dummyCallback } = props;
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
                <ResponsiveButton
                    icon={icon}
                    iconPosition="left"
                    label={label}
                    onClick={handleConfirm}
                    className={className}
                />
            )}

            {toConfirm && (
                <ResponsiveButton
                    icon={RiCheckDoubleFill}
                    iconPosition="left"
                    label={t('confirm-button.confirm')}
                    onClick={handleConfirmed}
                    className={className}
                />
            )}
        </>
    );
}
