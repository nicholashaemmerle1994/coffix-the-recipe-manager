import styles from './login.module.scss';

export default function Loginform() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <a className={styles.singup}>Log in</a>
        <div className={styles.inputBox1}>
          <input required />
          <span>Username</span>
        </div>
        <div className={styles.inputBox}>
          <input type="password" required />
          <span>Password</span>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.enter}>Enter</button>
          <button className={styles.enter}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
