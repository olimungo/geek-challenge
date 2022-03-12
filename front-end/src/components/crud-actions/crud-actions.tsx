import { useTranslation } from 'react-i18next';
import { MdArrowBack, MdCheck, MdDelete } from 'react-icons/md';
import { ConfirmButton } from 'components';
import { ResponsiveButton } from 'components/responsive';

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
                <div className="mr-2">
                    <ResponsiveButton
                        icon={MdArrowBack}
                        label={t('crud-actions.cancel')}
                        iconPosition="left"
                        size="md"
                        onClick={onCancel}
                    />
                </div>

                <div className="flex items-center">
                    {showDelete && (
                        <div className="mr-5">
                            <ConfirmButton
                                label={t('crud-actions.delete')}
                                icon={MdDelete}
                                onConfirm={onDelete}
                                className="btn-secondary"
                            />
                        </div>
                    )}

                    <ResponsiveButton
                        icon={MdCheck}
                        label={t('crud-actions.save')}
                        iconPosition="left"
                        size="md"
                        submitButton={true}
                        className="btn-primary"
                    />
                </div>
            </div>
        </div>
    );
}
