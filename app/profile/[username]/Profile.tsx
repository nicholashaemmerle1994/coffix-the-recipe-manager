import Image from 'next/image';
import Link from 'next/link';
import styles from './profile.module.scss';

type Props = {
  user: {
    id: string;
    userName: string;
  };
};

export default function Profile({ user }: Props) {
  return (
    <div>
      <div className={styles.upperPart}>
        <div>
          <Image src="/nice.jpeg" alt="nices foto" width={100} height={100} />
        </div>
        <div>
          <a href="http://localhost:3000/api/logout">
            <Image src="/logout.png" width={30} height={30} alt="Logout" />
          </a>

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
