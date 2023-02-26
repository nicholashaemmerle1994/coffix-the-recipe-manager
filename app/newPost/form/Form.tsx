'use client';
import { useState } from 'react';
import styles from './form.module.scss';
import { Timer } from './Timer';

type Coffee = {
  name: string;
  roaster: string;
  amountIn: number;
  amountOut: number;
  grindSetting: number;
  temperature: number;
  brewTime: string;
  tastingNotes: {
    Chocolatey?: string[];
    Fruity?: string[];
    Nutty?: string[];
    Sweet?: string[];
    Floral?: string[];
    Spice?: string[];
  };
};

export default function Form() {
  const [coffee, setCoffee] = useState<Coffee>({
    name: '',
    roaster: '',
    amountIn: 0,
    amountOut: 0,
    grindSetting: 0,
    temperature: 0, // in celsius
    brewTime: '',
    tastingNotes: {
      Chocolatey: [
        'Dark Chocolate',
        'Milk chocolate',
        'White chocolate',
        'Cocoa',
      ],
      Fruity: [
        'Lemon',
        'Lime',
        'Grapefruit',
        'Orange',
        'Apple',
        'Pear',
        'Melon',
        'Mango',
        'Banana',
        'Coconut',
        'Strawberry',
        'Raspberry',
        'Blueberry',
        'Plum',
      ],
      Nutty: ['Almond', 'Peanut', 'Hazelnut', 'Cashew', 'Walnut'],
      Sweet: ['Vanilla', 'Cane sugar', 'Brown sugar', 'Caramel'],
      Floral: ['Rose', 'Lavender', 'Jasmine', 'Lemongrass'],
      Spice: ['Ginger', 'Cinnamon', 'Black pepper'],
    },
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
          <option>89°</option>
          <option>90°</option>
          <option>91°</option>
          <option>92°</option>
          <option>93°</option>
          <option>94°</option>
          <option>95°</option>
          <option>96°</option>
          <option>97°</option>
        </select>
        <label htmlFor="brew-time-select">
          <div id="brew-time-select" aria-label="Select brew time">
            <Timer />
          </div>
        </label>
      </div>
      <h3>Tasting Notes</h3>
      {/* mapping of the tastingNotesOptions to generate the clickable lables for every category */}
      {Object.entries(coffee.tastingNotes).map(([category, options]) => (
        <div key={`category-${category}`}>
          <h4>{category}</h4>
          <div className={styles.categoryTaste}>
            {options.map((option) => (
              <label key={`option-${option}`} className={styles.label}>
                <input
                  className={styles.item}
                  type="checkbox"
                  value={option}
                  onChange={(event) => {
                    console.log(
                      `Changed ${option} in category ${category} to ${event.target.checked}`,
                    );
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <h3>Rating</h3>

      <h3>Taste</h3>
    </form>
  );
}
