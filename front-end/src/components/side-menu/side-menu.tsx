import { Menu } from 'components';
import { sectionGroups } from 'models';

type Props = {};

export function SideMenu(props: Props) {
    return (
        <div className="flex">
            <div className="z-40 h-full mt-4 fixed hidden md:block">
                <div className="h-full pt-12 w-60 bg-base-300 shadow-2xl">
                    <Menu sectionGroups={sectionGroups} />
                </div>
            </div>

            {/* Just an invisible pladholder behind the fixed container above.
                To make sure that the container to the right of the side menu
                is correctly centered */}
            <div className="mt-4 hidden invisible md:block pt-12 w-60"></div>
        </div>
    );
}
