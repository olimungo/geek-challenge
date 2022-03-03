import { useTranslation } from 'react-i18next';

export function Home() {
    const { t } = useTranslation();

    return (
        <>
            <div
                className="hero h-[50rem]"
                style={{
                    backgroundImage: 'url("homelander.jpeg")',
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>

                <div className="hero-content text-center text-neutral-content absolute top-60 left-60">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">
                            {t('homepage.hero')}
                        </h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">
                            {t('homepage.get-started')}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
