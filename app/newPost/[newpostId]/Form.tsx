'use client';

import { tastingNotes } from '@/database/tastingnotes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './form.module.scss';
import Timer from './Timer';

export type Coffee = {
  category: string;
  name: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSetting: number;
  temperature: number;
  brewTime: {
    minutes: number;
    seconds: number;
  };
  tastingNotes?: {
    name: string;
  }[];
};

type ApiTaste = {
  name: string;
}[];

type TastingNote = {
  name: string;
}[];

const chocolatey = tastingNotes.filter(
  (note) => note.category === 'Chocolatey',
);
const fruity: TastingNote = tastingNotes.filter(
  (note) => note.category === 'Fruity',
);
const nutty: TastingNote = tastingNotes.filter(
  (note) => note.category === 'Nutty',
);
const sweet: TastingNote = tastingNotes.filter(
  (note) => note.category === 'Sweet',
);
const floral: TastingNote = tastingNotes.filter(
  (note) => note.category === 'Floral',
);
const spice: TastingNote = tastingNotes.filter(
  (note) => note.category === 'Spice',
);

export default function Form(props: { name: string }) {
  const router = useRouter();
  const apiTaste: ApiTaste = [];
  const [coffee, setCoffee] = useState<Coffee>({
    category: props.name,
    name: '',
    roaster: '',
    amountIn: 0,
    amountOut: 0,
    grindSetting: 0,
    temperature: 0, // in celsius
    brewTime: {
      minutes: 0,
      seconds: 0,
    },
    tastingNotes: apiTaste,
  });
  return (
    <form className={styles.form}>
      <h3>Setup</h3>
      <div className={styles.category}>
        <input
          placeholder="Coffee Name"
          onChange={(event) => {
            setCoffee({
              ...coffee,
              name: event.target.value,
            });
          }}
        />
        <input
          placeholder="Roaster"
          onChange={(event) => {
            setCoffee({
              ...coffee,
              roaster: event.target.value,
            });
          }}
        />
      </div>
      <h3>Brew</h3>
      <div className={styles.category}>
        <input
          placeholder="Amount in grams"
          type="number"
          onChange={(event) => {
            setCoffee({
              ...coffee,
              amountIn: parseInt(event.target.value),
            });
          }}
        />
        <input
          placeholder="Amount out in grams"
          onChange={(event) => {
            setCoffee({
              ...coffee,
              amountOut: parseInt(event.target.value),
            });
          }}
        />
        <input
          placeholder="Grind size"
          onChange={(event) => {
            setCoffee({
              ...coffee,
              grindSetting: parseInt(event.target.value),
            });
          }}
        />
        <select
          placeholder="Brew temperature"
          onChange={(event) => {
            setCoffee({
              ...coffee,
              temperature: parseInt(event.target.value),
            });
          }}
        >
          <option defaultValue="Choose the brewing temperature">
            Choose the brewing temperature
          </option>
          <option>89</option>
          <option>90</option>
          <option>91</option>
          <option>92</option>
          <option>93</option>
          <option>94</option>
          <option>95</option>
          <option>96</option>
          <option>97</option>
        </select>
        <label htmlFor="brew-time-select">
          <div id="brew-time-select" aria-label="Select brew time">
            {/* set brew time minutes */}
            <Timer coffee={coffee} setCoffee={setCoffee} />
          </div>
        </label>
      </div>
      <h3>Tasting Notes</h3>
      {/* mapping over the chocolatey array to display every possiple choice for the user */}
      <div>
        <h4>Chocolatey</h4>
        <div className={styles.categoryTaste}>
          {chocolatey.map((note) => (
            <label key={`option-${note.name}`} className={styles.label}>
              <input
                className={styles.item}
                type="checkbox"
                value={note.name}
                onChange={(event) => {
                  if (event.target.checked) {
                    apiTaste.push(note.name);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note.name);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      {/* Mapping over the Fruity array to display all choices for the user */}
      <div>
        <h4>Fruity</h4>
        <div className={styles.categoryTaste}>
          {fruity.map((note) => (
            <label key={`option-${note.name}`} className={styles.label}>
              <input
                className={styles.item}
                type="checkbox"
                value={note.name}
                onChange={(event) => {
                  if (event.target.checked) {
                    apiTaste.push(note.name);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note.name);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      {/* Mapping over the Nutty array to display all choices for the user */}
      <div>
        <h4>Nutty</h4>
        <div className={styles.categoryTaste}>
          {nutty.map((note) => (
            <label key={`option-${note.name}`} className={styles.label}>
              <input
                className={styles.item}
                type="checkbox"
                value={note.name}
                onChange={(event) => {
                  if (event.target.checked) {
                    apiTaste.push(note.name);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note.name);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      {/* Mapping over the Sweet array to display all choices for the user */}
      <div>
        <h4>Sweet</h4>
        <div className={styles.categoryTaste}>
          {sweet.map((note) => (
            <label key={`option-${note.name}`} className={styles.label}>
              <input
                className={styles.item}
                type="checkbox"
                value={note.name}
                onChange={(event) => {
                  if (event.target.checked) {
                    apiTaste.push(note.name);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note.id);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      {/* Mapping over the Floral array to display all choices for the user */}
      <div>
        <h4>Floral</h4>
        <div className={styles.categoryTaste}>
          {floral.map((note) => (
            <label key={`option-${note.name}`} className={styles.label}>
              <input
                className={styles.item}
                type="checkbox"
                value={note.name}
                onChange={(event) => {
                  if (event.target.checked) {
                    apiTaste.push(note.name);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note.name);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      {/* Mapping over the Spicy array to display all choices for the user */}
      <div>
        <h4>Spices</h4>
        <div className={styles.categoryTaste}>
          {spice.map((note) => (
            <label key={`option-${note.name}`} className={styles.label}>
              <input
                className={styles.item}
                type="checkbox"
                value={note.name}
                onChange={(event) => {
                  if (event.target.checked) {
                    apiTaste.push(note.name);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note.name);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      <h3>Rating</h3>

      <h3>Taste</h3>
    </form>
  );
}
