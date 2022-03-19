import { createElement, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { IconType } from 'react-icons/lib';

export type IconSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const Sizes = {
    xs: { w400: '.6rem', w800: '.7rem', full: '.8rem' },
    sm: { w400: '.8rem', w800: '.9rem', full: '1rem' },
    md: { w400: '1rem', w800: '1.2rem', full: '1.4rem' },
    lg: { w400: '2.2rem', w800: '2.5rem', full: '2.8rem' },
    xl: { w400: '3rem', w800: '3.3rem', full: '3.6rem' },
};

type Props = {
    icon: IconType;
    size?: IconSizes;
    className?: string;
};

export function ResponsiveIcon(props: Props) {
    const { icon, size: iconSize = 'md', className } = props;
    const [size, setIconSize] = useState(checkSize());

    function checkSize() {
        if (window.innerWidth < 400) {
            return Sizes[iconSize].w400;
        } else if (window.innerWidth < 768) {
            return Sizes[iconSize].w800;
        } else {
            return Sizes[iconSize].full;
        }
    }

    useEffect(() => {
        function resize() {
            setIconSize(checkSize());
        }

        resize();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={className}>
                <IconContext.Provider value={{ size }}>
                    {createElement(icon)}
                </IconContext.Provider>
            </div>
        </>
    );
}
