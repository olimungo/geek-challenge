import { useTranslation } from 'react-i18next';

export function About() {
    const { t } = useTranslation();

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-2xl md:text-4xl p-5 mb-5">{t('about.us')}</h1>

            <div className="mockup-code text-xs md:text-md w-11/12 lg:w-[35rem]">
                <pre data-prefix="$">
                    <code>npm i geek-challenge</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                    <code>installing...</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code>Done!</code>
                </pre>
                <pre data-prefix="$">
                    <code>ping elvis -c 1</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                    <code>PING elvis (666.666.0.1): 56 data bytes</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code>64 bytes from 666.666.0.1:</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code className="ml-5">icmp_seq=0 ttl=64 time=8.261ms</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code>round-trip min/avg/max/stddev =</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code className="ml-5">8.261/8.331/8.400/0.069ms</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code>elvis is alive!</code>
                </pre>
                <pre data-prefix="$">
                    <code>kill -9 putin</code>
                </pre>
                <pre data-prefix=">" className="text-warning">
                    <code>connecting to deathstar.cc.cec.eu.int...</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code>process, system and universe cleaned</code>
                </pre>
                <pre data-prefix=">" className="text-success">
                    <code>... now get a life</code>
                </pre>
            </div>
        </div>
    );
}
