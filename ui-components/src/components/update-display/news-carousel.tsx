import { useCallback, useState } from 'react';
import './news-carousel.css';
import type { BadgeType } from '../badge/badge';
import Badge from '../badge/badge';

const ITEM_HEIGHT = 76;

export interface NewsItem {
    badge: BadgeType;
    title: string;
    subtitle: string;
    date: string;
    href?: string;
}

type Direction = 'up' | 'down';

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function ChevronUp() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

interface RowState {
    item: NewsItem;
    key: number;
    entering: Direction | null;
}

function NewsItem({ row }: { row: RowState }) {
    const { item, key, entering } = row;

    let animationClass = '';

    if(entering === 'down'){
        animationClass = ' slide-in-down';
    }
    if(entering === 'up'){
        animationClass = ' slide-in-up';
    }

    return (
        <div key={key} className={`news-carousel-row${animationClass}`}>
            <div className='news-carousel-row-left'>
                <div className='news-carousel-row-title'>
                    <Badge type={item.badge} />
                    {item.title}
                </div>
                <div className='news-carousel-row-subtitle'>
                    {item.subtitle}
                </div>
            </div>

            <div className='news-carousel-row-right'>
                <span className="news-carousel-row-date"> {item.date} </span>
                <a href={item.href ?? "#"} className="news-carousel-row-link">
                    Learn More 
                </a>
            </div>
        </div>
    )
}

export default function NewsCarousel (props: {
    title: string;
    data: NewsItem[], 
    visibleCount: number, 
}) {
    
    const len = props.data.length;
    const getLength = Math.min(props.visibleCount, len);

    const [ topIndex, setTopIndex ] = useState<number>(0);
    const [ animating, setAnimating ] = useState<boolean>(false);
    const [ direction, setDirection ] = useState<Direction | null>(null);
    const [ keyCounter, setKeyCounter ] = useState(0);

    const navigate = useCallback(
        (direction: Direction) => {
            if(animating){
                return;
            }
            setAnimating(true);
            setDirection(direction);
            setTopIndex((prev) => mod(prev + (direction === 'down' ? 1 : -1), len));
            setKeyCounter((k) => k+1);
            setTimeout(() => setAnimating(false), 450)
        },
        [animating, len]
    );

    const rows: RowState[] = Array.from({ length: getLength }, (_, i) => {
        const itemIndex = mod(topIndex + i, len);
        const isEnteringRow = direction === "down" 
            ? i === getLength - 1 
            : i === 0;

        return {
            item: props.data[itemIndex],
            key: keyCounter * getLength + i,
            entering: animating && isEnteringRow ? direction : null,
        };
    });

    return(
        <div className='news-carousel-container'>
            <h2 className='news-carousel-title'> {props.title} </h2>

            <div className='news-carousel-content' style={{ height: getLength * ITEM_HEIGHT}}>
                <div className='news-carousel-track'>
                    {rows.map((row) => (
                        <NewsItem key={row.key} row={row} />
                    ))}
                </div>
            </div>

            <div className='news-carousel-controls'>
                <div className='news-carousel-dots' aria-hidden='true'>
                    {props.data.map((_, i) => (
                        <div 
                            key={i} 
                            className={
                                `news-carousel-dot${i === topIndex 
                                    ? ' news-carousel-dot--active'
                                    : ''
                                }`
                            } 
                        />
                    ))}
                </div>

                <button
                    className="news-carousel-button"
                    aria-label="Previous item"
                    onClick={() => navigate("up")}
                >
                    <ChevronUp />
                </button>

                <button
                    className="news-carousel-button"
                    aria-label="Next item"
                    onClick={() => navigate("down")}
                >
                    <ChevronDown />
                </button>
            </div>
        </div>
    )
};

