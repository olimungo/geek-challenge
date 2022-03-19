import { IconType } from 'react-icons';
import {
    MdHome,
    MdPeople,
    MdInfoOutline,
    MdMoreHoriz,
    MdBugReport,
    MdAlarm,
    MdFace,
    MdPanTool,
    MdLeaderboard,
    MdTheaters,
    MdRadio,
    MdEmail,
    MdVoicemail,
} from 'react-icons/md';
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

const sectionsBrol: Section[] = [
    {
        label: 'menu.page-not-found',
        icon: MdBugReport,
        uri: '/page-not-found',
    },
];

const sectionsTrucs: Section[] = [
    {
        label: 'menu.alarm',
        icon: MdAlarm,
        uri: '/alarm',
    },
    {
        label: 'menu.face',
        icon: MdFace,
        uri: '/alarm',
    },
    {
        label: 'menu.graph',
        icon: MdLeaderboard,
        uri: '/alarm',
    },
    {
        label: 'menu.hand',
        icon: MdPanTool,
        uri: '/alarm',
    },
];

const sectionsCarabistouilles: Section[] = [
    {
        label: 'menu.movie',
        icon: MdTheaters,
        uri: '/favorite',
    },
    {
        label: 'menu.radio',
        icon: MdRadio,
        uri: '/favorite',
    },
    {
        label: 'menu.mail',
        icon: MdEmail,
        uri: '/favorite',
    },
    {
        label: 'menu.tape',
        icon: MdVoicemail,
        uri: '/favorite',
    },
];

export const sectionGroups: SectionGroup[] = [
    { label: 'menu.people', sections: sectionsPeople },
    { label: 'menu.brol', sections: sectionsBrol },
    { label: 'menu.trucs', sections: sectionsTrucs },
    { label: 'menu.carabistouilles', sections: sectionsCarabistouilles },
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
