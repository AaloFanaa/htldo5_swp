import { FC } from 'react';
import styles from './displayCard.module.css';
import Image from 'next/image';

interface displayCardProps {
  displayName: string;
  isbn: string;
  author: string;
  image: string | null;
}

const displayCard: FC<displayCardProps> = (props) => {
  const bookPlaceholder = '/../../../public/bookPlaceholder.png';

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {props.image ? (
          <Image src={props.image} alt='Book' width='64' height='64' />
        ) : (
          <Image src={bookPlaceholder} alt='Placeholder' width='64' height='64' />
        )}
      </div>
      <div className={styles.name}>{props.displayName}</div>
      <div className={styles.author}>{props.author}</div>
      <div className={styles.isbn}>{props.isbn}</div>
    </div>
  );
};

export default displayCard;
