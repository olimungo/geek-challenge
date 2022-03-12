import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePeopleStore } from 'hooks';
import { ConfirmButton, ComponentWithTimeOut } from 'components';
import { MdDeleteOutline } from 'react-icons/md';
import { HiDatabase } from 'react-icons/hi';

export function PeopleFactory() {
    const { t } = useTranslation();
    const [count, setCount] = useState(100);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [showGenerateMessage, setShowGenerateMessage] = useState(false);
    const [withAvatar, setWithAvatar] = useState(false);
    const { createPeople, deletePeople } = usePeopleStore();

    return (
        <div className="flex flex-col items-center pt-20">
            <div className="card w-96 sm:w-[40rem] bg-base-100 shadow-xl mb-10">
                <div className="card-body p-0">
                    <h1 className="text-slate-700 text-xl bg-slate-400 px-8 py-5">
                        {t('people.factory.range-label')}
                    </h1>

                    <div className="p-5">
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
                                    onChange={() => setWithAvatar(!withAvatar)}
                                    className="checkbox checkbox-primary"
                                />
                            </label>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                {showGenerateMessage && (
                                    <ComponentWithTimeOut
                                        component={
                                            <div className="text-md sm:text-xl text-slate-400 pl-1 sm:pl-2">
                                                {t(
                                                    'people.factory.generate-message'
                                                )}
                                            </div>
                                        }
                                        delay={3}
                                        timeOut={() =>
                                            setShowGenerateMessage(false)
                                        }
                                    />
                                )}
                            </div>

                            <div className="card-actions justify-end">
                                <ConfirmButton
                                    label={t('people.factory.generate')}
                                    icon={HiDatabase}
                                    onConfirm={() => {
                                        setShowGenerateMessage(true);
                                        createPeople(count, withAvatar);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card w-96 sm:w-[40rem] bg-base-100 shadow-xl">
                <div className="card-body p-0">
                    <h1 className="text-slate-700 text-xl bg-slate-400 px-8 py-5">
                        {t('people.factory.empty-db')}
                    </h1>

                    <div className="flex p-5 justify-between items-center">
                        <div>
                            {showDeleteMessage && (
                                <ComponentWithTimeOut
                                    component={
                                        <div className="text-md sm:text-xl text-slate-400 pl-1 sm:pl-2">
                                            {t('people.factory.empty-message')}
                                        </div>
                                    }
                                    delay={3}
                                    timeOut={() => setShowDeleteMessage(false)}
                                />
                            )}
                        </div>

                        <div className="card-actions">
                            <ConfirmButton
                                label={t('people.factory.empty')}
                                icon={MdDeleteOutline}
                                onConfirm={() => {
                                    setShowDeleteMessage(true);
                                    deletePeople();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
