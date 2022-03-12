import { Menu } from 'components';
import { sectionGroups } from 'models';

type Props = {};

export function SideMenu(props: Props) {
    return (
        <div className="z-40 mt-4 hidden md:block">
            <div className="h-full pt-12 w-60 bg-base-300 shadow-2xl">
                <Menu sectionGroups={sectionGroups} />
            </div>
        </div>
    );
}
