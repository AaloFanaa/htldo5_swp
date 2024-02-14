import { FC } from 'react';
import styles from './displayCard.module.css';
import Image from 'next/image';
import placeholderImage from '../../../public/bookPlaceholder.png';
import { useSession } from 'next-auth/react';

interface displayCardProps {
  displayName: string;
  author: string | null;
  image: string | null;
  link: string;
}

const displayCard: FC<displayCardProps> = (props) => {
  const sessionData = useSession();

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {props.image ? (
          <Image src={props.image} alt='Thumbnail' width='180' height='230' />
        ) : (
          <Image src={placeholderImage} alt='Placeholder' width='180' height='230' />
        )}
      </div>
      <div className={styles.name}>{props.displayName}</div>
      <div className={styles.author}>{props.author}</div>
    </div>
  );
};

export default displayCard;
