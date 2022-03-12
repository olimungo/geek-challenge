import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { ResponsiveIcon, IconSizes } from 'components';

type IconPosition = 'top' | 'right' | 'bottom' | 'left';
type ButtonType = 'submit' | 'reset' | 'button';

type Props = {
    label: string;
    icon?: IconType;
    iconPosition?: IconPosition;
    size?: IconSizes;
    submitButton?: boolean;
    className?: string;
    forceLabel?: boolean;
    onClick?: () => void;
};

export function ResponsiveButton(props: Props) {
    const dummyCallback = () => true;
    const {
        label,
        icon,
        iconPosition = 'right',
        size = 'md',
        submitButton = false,
        className = 'whitesmoke',
        forceLabel = false,
        onClick = dummyCallback,
    } = props;
    const [flexCol, setFlexCol] = useState('');
    const [typeButton, setTypeButton] = useState<ButtonType>('button');
    const [hideLabelWhenSmallDevice, setHideLabelWhenSmallDevice] =
        useState('');

    useEffect(() => {
        if (iconPosition === 'top' || iconPosition === 'bottom') {
            setFlexCol('flex-col');
        } else {
            setFlexCol('');
        }
    }, [iconPosition]);

    useEffect(() => {
        if (forceLabel) {
            setHideLabelWhenSmallDevice('');
        } else {
            setHideLabelWhenSmallDevice('hidden sm:block');
        }
    }, [forceLabel]);

    useEffect(() => {
        if (submitButton) {
            setTypeButton('submit');
        } else {
            setTypeButton('button');
        }
    }, [submitButton]);

    return (
        <button
            type={typeButton}
            className={`btn btn-md ${className}`}
            onClick={onClick}
        >
            <div className={`flex items-center ${flexCol}`}>
                {icon &&
                    (iconPosition === 'left' || iconPosition === 'top') && (
                        <ResponsiveIcon icon={icon} size={size} />
                    )}

                <div
                    className={`text-sm xm:text-sm md:text-md mx-1 max-w-[11rem] xs:max-w-lg truncate ${hideLabelWhenSmallDevice}`}
                >
                    {label}
                </div>

                {icon &&
                    (iconPosition === 'right' || iconPosition === 'bottom') && (
                        <ResponsiveIcon icon={icon} size={size} />
                    )}
            </div>
        </button>
    );
}
