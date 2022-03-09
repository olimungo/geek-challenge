import { useTranslation } from 'react-i18next';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import { ConfirmButton } from 'components';

type Props = {
    showDelete?: boolean;
    onCancel?: () => void;
    onDelete?: () => void;
};

export function CrudActions(props: Props) {
    const dummyCallback = () => true;
    const { t } = useTranslation();
    const {
        showDelete = true,
        onCancel = dummyCallback,
        onDelete = dummyCallback,
    } = props;

    return (
        <div>
            <div className="justify-between card-actions">
                <button
                    className="btn btn-sm sm:btn-md"
                    type="button"
                    onClick={onCancel}
                >
                    <MdArrowBack size="1.3rem" className="mr-2" />{' '}
                    {t('crud-actions.cancel')}
                </button>

                <div className="flex items-center">
                    {showDelete && (
                        <div className="mr-5">
                            <ConfirmButton
                                label={t('crud-actions.delete')}
                                onConfirm={onDelete}
                            />
                        </div>
                    )}

                    <button
                        className="btn btn-sm sm:btn-md btn-primary"
                        type="submit"
                    >
                        <MdCheck size="1.3rem" className="mr-2" />{' '}
                        {t('crud-actions.save')}
                    </button>
                </div>
            </div>
        </div>
    );
}
