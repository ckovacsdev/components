import './badge.css';

export type BadgeType = 'New' | 'Update' | 'Note';

const BADGE_CLASS: Record<BadgeType, string> = {
    Update: 'badge badge--update',
    New: 'badge badge--new',
    Note: 'badge badge--note',
};

export default function Badge(props: {type: BadgeType}){
    return <span className={BADGE_CLASS[props.type]}>{props.type}</span>;
}