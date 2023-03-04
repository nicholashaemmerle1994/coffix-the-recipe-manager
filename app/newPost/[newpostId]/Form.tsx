'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { tastingNotes } from '../../../database/tastingnotes';
import styles from './form.module.scss';

export type Coffee = {
  category: string;
  name: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSize: number;
  temperature: number;
  brewTimeMinutes: number;
  brewTimeSeconds: number;
  notes: string;
};

type ApiTaste = {
  id: number;
  category: string;
  name: string;
}[];

type TastingNote = {
  id: number;
  category: string;
  name: string;
}[];

// Filter the whole tasting notes database into categories
const chocolatey: TastingNote = tastingNotes.filter(
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
  const category = props.name;
  // setting minutes and seconds for the timer
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const apiTaste: ApiTaste = [];
  // setting the state for the coffee object will be sent to the api
  const [coffee, setCoffee] = useState<Coffee>({
    category: category,
    name: '',
    roaster: '',
    amountIn: 0,
    amountOut: 0,
    grindSize: 0,
    temperature: 0, // in celsius
    brewTimeMinutes: 0,
    brewTimeSeconds: 0,
    notes: '',
  });
  // creating the handler function for the timer
  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinutes(parseInt(event.target.value));
    setCoffee({
      ...coffee,
      brewTimeMinutes: minutes,
    });
    router.refresh();
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeconds(parseInt(event.target.value));
    setCoffee({
      ...coffee,
      brewTimeSeconds: seconds,
    });
  };
  // creating the options for the timer
  const minuteOptions = Array.from({ length: 6 }, (_, i) => (
    <option key={`minute-${i}`} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));

  const secondOptions = Array.from({ length: 60 }, (_, i) => (
    <option key={`second-${i}`} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));

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
              grindSize: parseInt(event.target.value),
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
            <div className={styles.div}>
              Brew Time:
              <select name="minutes" onChange={handleMinutesChange}>
                {minuteOptions}
              </select>
              <span>:</span>
              {/* set brew time seconds */}
              <select name="seconds" onChange={handleSecondsChange}>
                {secondOptions}
              </select>
            </div>
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
                    apiTaste.push(note);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note);
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
                    apiTaste.push(note);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note);
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
                    apiTaste.push(note);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note);
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
                    apiTaste.push(note);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note);
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
                    apiTaste.push(note);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note);
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
                    apiTaste.push(note);
                  }
                  // if the checkbox is unchecked, remove the value from the array
                  else {
                    const index = apiTaste.indexOf(note);
                    apiTaste.splice(index, 1);
                  }
                }}
              />
              {note.name}
            </label>
          ))}
        </div>
      </div>
      <h3>Notes</h3>
      <div>
        <textarea name="notes" />
      </div>
      <div className={styles.buttonDiv}>
        <button
          onClick={async (event) => {
            event.preventDefault();
            const finalApiTaste = apiTaste.map((taste) => {
              return {
                id: taste.id,
                category: taste.category,
                tasting_note_name: taste.name,
              };
            });
            console.log(finalApiTaste);
            const response = await fetch('/api/recipes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                categoryName: coffee.category,
                coffee: coffee.name,
                roaster: coffee.roaster,
                amountIn: coffee.amountIn,
                amountOut: coffee.amountOut,
                grindSize: coffee.grindSize,
                brewTemperature: coffee.temperature,
                brewTimeMinutes: coffee.brewTimeMinutes,
                brewTimeSeconds: coffee.brewTimeSeconds,
                tastingNotes: finalApiTaste,
                notes: coffee.notes,
              }),
            });

            setMinutes(0);
            setSeconds(0);
            // router.push('/');
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
}
