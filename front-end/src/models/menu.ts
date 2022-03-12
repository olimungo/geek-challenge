import { IconType } from 'react-icons';
import { MdHome, MdPeople, MdInfoOutline, MdMoreHoriz } from 'react-icons/md';
import { RiBuilding3Fill } from 'react-icons/ri';

export type Section = {
    label: string;
    icon: IconType;
    uri: string;
};

export type SectionGroup = {
    label: string;
    sections: Section[];
};

const sectionsPeople: Section[] = [
    {
        label: 'menu.homepage',
        icon: MdHome,
        uri: '/home',
    },
    {
        label: 'menu.people',
        icon: MdPeople,
        uri: '/people',
    },
    {
        label: 'menu.factory',
        icon: RiBuilding3Fill,
        uri: '/people/factory',
    },
    {
        label: 'menu.about',
        icon: MdInfoOutline,
        uri: '/about',
    },
];

export const sectionGroups: SectionGroup[] = [
    { label: 'menu.people', sections: sectionsPeople },
    { label: 'menu.brol', sections: sectionsPeople },
    { label: 'menu.trucs', sections: sectionsPeople },
    { label: 'menu.carabistouilles', sections: sectionsPeople },
];

export type FooterSection = {
    label: string;
    icon: IconType;
    uri: string;
};

export const footerSections: FooterSection[] = [
    {
        label: 'menu.homepage',
        icon: MdHome,
        uri: '/home',
    },
    {
        label: 'menu.people',
        icon: MdPeople,
        uri: '/people',
    },
    {
        label: 'menu.factory',
        icon: RiBuilding3Fill,
        uri: '/people/factory',
    },
    {
        label: 'menu.about',
        icon: MdInfoOutline,
        uri: '/about',
    },
    {
        label: 'menu.more',
        icon: MdMoreHoriz,
        uri: '/menu',
    },
];
