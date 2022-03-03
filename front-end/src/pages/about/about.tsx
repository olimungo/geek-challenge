import { useTranslation } from 'react-i18next';

export function About() {
    const { t } = useTranslation();

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-5xl p-5 mb-5">{t('about.us')}</h1>

            <div className="mockup-code w-4/5 lg:w-[50rem]">
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
                    <code>ping elvis</code>
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
                    <code>
                        process, system and universe cleaned... now get a life
                    </code>
                </pre>
            </div>
        </div>
    );
}
