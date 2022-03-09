import { useState } from 'react';
import { usePeopleStore } from 'hooks';
import { ConfirmButton } from 'components';
import { useTranslation } from 'react-i18next';

export function PeopleFactory() {
    const { t } = useTranslation();
    const [count, setCount] = useState(100);
    const [withAvatar, setWithAvatar] = useState(false);
    const { createPeople } = usePeopleStore();

    return (
        <div className="flex justify-center">
            <div className="card w-96 sm:w-[40rem] bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="my-7 text-slate-400 text-xl">
                        {t('people.factory.range-label')}
                    </h1>

                    <div className="flex flex-col items-center mb-10">
                        <div className="text-3xl mb-5">{count}</div>

                        <input
                            type="range"
                            min="100"
                            max="1000"
                            value={count}
                            onChange={(event) =>
                                setCount(Number(event.target.value))
                            }
                            className="range"
                            step="100"
                        />
                        <div className="w-full flex justify-between text-xs px-2">
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                            <span>|</span>
                        </div>
                    </div>

                    <div className="mb-16">
                        <label className="label cursor-pointer w-48">
                            <h1 className="label-text text-slate-400 text-xl">
                                {t('people.factory.with-avatar')}
                            </h1>

                            <input
                                type="checkbox"
                                checked={withAvatar}
                                onChange={(event) => setWithAvatar(!withAvatar)}
                                className="checkbox checkbox-primary"
                            />
                        </label>
                    </div>

                    <div className="card-actions justify-end">
                        <ConfirmButton
                            label={t('people.factory.generate')}
                            onConfirm={() => createPeople(count, withAvatar)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
