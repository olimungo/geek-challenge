import { ResponsiveButton } from 'components/responsive';
import { useTranslation } from 'react-i18next';
import { BiChevronsRight } from 'react-icons/bi';

export function Home() {
    const { t } = useTranslation();

    return (
        <>
            <div className="hero h-full overflow-scroll">
                <img
                    src="homelander.png"
                    alt="hero or vilain? "
                    className="w-full h-full object-cover object-right md:object-center"
                />

                <div className="hero-overlay bg-opacity-60"></div>

                <div className="hero-content text-center text-neutral-content absolute top-32 md:top-40 md:left-60 lg:top-32 lg:left-72">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
                            {t('homepage.hero')}
                        </h1>

                        <p className="mb-5 text-md sm:text-lg">
                            {t('homepage.description')}
                        </p>

                        <ResponsiveButton
                            label={t('homepage.get-started')}
                            icon={BiChevronsRight}
                            className="btn-primary"
                            forceLabel={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
