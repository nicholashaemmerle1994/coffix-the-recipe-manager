'use client';
import { category } from 'database/category';
import Image from 'next/image';
import Link from 'next/link';
import styles from './category.module.scss';

export default function Category() {
  return (
    <div className={styles.wholePage}>
      <h2>Choose your brew method</h2>
      {category.map((brew) => {
        return (
          <Link href="/newpost/form" key={`brew-method-${brew.name}`}>
            <div className={styles.methoddiv}>
              <Image src={brew.icon} alt={brew.name} width={50} height={50} />
              <p>{brew.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
