import { FC } from 'react';
import styles from './displayCard.module.css';
import Image from 'next/image';
import placeholderImage from '../../../public/bookPlaceholder.png';
import { useSession } from 'next-auth/react';
import { firestore } from '../page';
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
} from 'firebase/firestore';

interface displayCardProps {
  displayName: string;
  author: string | null;
  image: string | null;
  link: string;
  showDelButton: boolean;
  showAddButton: boolean;
  onDelete: () => Promise<void>;
}

const DisplayCard: FC<displayCardProps> = (props) => {
  const sessionData = useSession();

  const addToLibrary = async (name: string, link: string) => {
    const userRef = doc(
      firestore,
      'user-libraries',
      sessionData.data?.user?.id
    );
    try {
      await setDoc(
        userRef,
        { [props.displayName]: props.link },
        { merge: true }
      );
      alert('Successfully added entry to the library!');
    } catch (error) {
      console.log('Could not add to library:', error);
      alert('A problem occurred while adding an entry to the library!');
    }
  };

  const deleteFromLibrary = async (name: string) => {
    const userRef = doc(
      firestore,
      'user-libraries',
      sessionData.data?.user?.id
    );
    try {
      await updateDoc(userRef, { [props.displayName]: deleteField() });
      alert('Successfully removed entry from the library!');
      props.onDelete();
    } catch (error) {
      console.log('Could not remove from library:', error);
      alert('A problem occurred while removing an entry from the library!');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        {props.image ? (
          <Image src={props.image} alt='Thumbnail' width='180' height='230' />
        ) : (
          <Image
            src={placeholderImage}
            alt='Placeholder'
            width='180'
            height='230'
          />
        )}
      </div>
      <div className={styles.name}>{props.displayName}</div>
      <div className={styles.author}>{props.author}</div>
      <div className={styles.buttonsWrapper}>
        {props.showAddButton ? (
          <div
            className={styles.addButton}
            onClick={() => addToLibrary(props.displayName, props.link)}>
            Add to library
          </div>
        ) : (
          <></>
        )}

        {props.showDelButton ? (
          <div
            className={styles.deleteButton}
            onClick={() => deleteFromLibrary(props.displayName)}>
            Delete from library
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DisplayCard;
