import { FC } from 'react';
import styles from './displayCard.module.css';
import Image from 'next/image';
import placeholderImage from '../../../public/bookPlaceholder.png';
import { useSession } from 'next-auth/react';
import { firestore } from '../page';
import { doc, setDoc } from 'firebase/firestore';

interface displayCardProps {
  displayName: string;
  author: string | null;
  image: string | null;
  link: string;
}

const displayCard: FC<displayCardProps> = (props) => {
  const sessionData = useSession();
  const addToLibrary = async (name: string, link: string) => {
    //@ts-expect-error
    const userRef = doc(firestore, 'user-libraries', sessionData.data?.user?.id);
    try {
      await setDoc(userRef, { [props.displayName]: props.link }, { merge: true });
      alert('Successfully added entry to the library!');
    } catch (error) {
      console.log('Could not add to library:', error);
      alert('A problem occured while adding an entry to the library!');
    }
  };

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
      <div className={styles.addButton} onClick={() => addToLibrary(props.displayName, props.link)}>
        Add to library
      </div>
    </div>
  );
};

export default displayCard;
