import { useEffect, useState } from 'react';
import './component-with-time-out.css';

type Props = {
    component: JSX.Element | string;
    delay: number; // in seconds
    timeOut: () => void;
};

export function ComponentWithTimeOut(props: Props) {
    const { component, delay, timeOut } = props;
    const [effect, setEffect] = useState('fade-in');

    useEffect(() => {
        let timer2: NodeJS.Timeout;

        const timer1 = setTimeout(() => {
            setEffect('fade-out');

            timer2 = setTimeout(() => {
                timeOut();
            }, 600);
        }, delay * 1000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className={`fade-in ${effect}`}>{component}</div>;
}
