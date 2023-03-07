import Image from 'next/image';
import styles from './profile.module.scss';

export default function Profile({ user }) {
  return (
    <div>
      <div className={styles.upperPart}>
        <div>
          <Image src="/nice.jpeg" alt={'nices foto'} width={100} height={100} />
        </div>
        <div>
          <p>Posts:</p>
          <div>
            <h5>{user.userName}</h5>
            <p>Bla Bla Bla</p>
          </div>
        </div>
      </div>
    </div>
  );
}
