'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { tastingNotes } from '../../../database/tastingnotes';

// Filter the whole tasting notes database into categories
const chocolatey = tastingNotes.filter(
  (note) => note.category === 'Chocolatey',
);
const fruity = tastingNotes.filter((note) => note.category === 'Fruity');
const nutty = tastingNotes.filter((note) => note.category === 'Nutty');
const sweet = tastingNotes.filter((note) => note.category === 'Sweet');
const floral = tastingNotes.filter((note) => note.category === 'Floral');
const spice = tastingNotes.filter((note) => note.category === 'Spice');

export default function Form(props) {
  const router = useRouter();
  const category = props.id;
  const userId = props.userId;
  // setting minutes and seconds for the timer
  const apiTaste = [];
  // setting the state for the coffee object will be sent to the api
  const [coffee, setCoffee] = useState({
    userId: userId,
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
  async function handleOnSubmit(event) {
    event.preventDefault();
    if (
      coffee.name === '' ||
      coffee.roaster === '' ||
      coffee.amountIn === 0 ||
      coffee.amountOut === 0
    ) {
      toast.error('Please fill out all the fields');
      return;
    }

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'coffix-imgs');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dtxtj5v8n/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());
    if (data.secure_url === undefined) {
      const finalApiTaste = apiTaste.map((taste) => {
        return {
          tasting_note_id: taste.id,
          category: taste.category,
          tasting_note_name: taste.name,
        };
      });

      await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          categoryId: coffee.category,
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
          pictureUrl: '/beans.png',
          csrfToken: props.token,
        }),
      });
      toast.success('Recipe added');
      router.push('/posts');
      router.refresh();
    } else {
      const finalApiTaste = apiTaste.map((taste) => {
        return {
          tasting_note_id: taste.id,
          category: taste.category,
          tasting_note_name: taste.name,
        };
      });
      await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          categoryId: coffee.category,
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
          pictureUrl: data.secure_url,
          csrfToken: props.token,
        }),
      });

      toast.success('Recipe added');
      router.push('/posts');
      router.refresh();
    }
  }
  // creating the handler function for the timer
  // giving the event a type
  const handleMinutesChange = (event) => {
    setCoffee({
      ...coffee,
      brewTimeMinutes: parseInt(event.target.value),
    });
    router.refresh();
  };

  const handleSecondsChange = (event) => {
    setCoffee({
      ...coffee,
      brewTimeSeconds: parseInt(event.target.value),
    });
  };
  // creating the options for the timer
  const minuteOptions = Array.from({ length: 6 }, (unusedParam, i) => (
    <option key={`second-${i}`} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));

  const secondOptions = Array.from({ length: 60 }, (unusedParam, i) => (
    <option key={`second-${i}`} value={i}>
      {i.toString().padStart(2, '0')}
    </option>
  ));

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            duration: 2500,
          },
          error: {
            duration: 2500,
          },
        }}
      />
      <form className="flex flex-col justify-center align-center text-center gap-3 mx-3 text-info mt-3">
        <h3 className="text-info font-bold">Setup</h3>
        <div className="flex flex-col bg-secondary justify-self-center gap-3 rounded-xl ">
          <input
            required
            className="input input-bordered input-sm w-full max-w-xs self-center mt-3 border-gray-400 text-info"
            placeholder="Coffee Name"
            onChange={(event) => {
              setCoffee({
                ...coffee,
                name: event.target.value,
              });
            }}
          />
          <input
            required
            className="input input-bordered input-sm w-full max-w-xs self-center mb-3 border-gray-400 text-info"
            placeholder="Roaster"
            onChange={(event) => {
              setCoffee({
                ...coffee,
                roaster: event.target.value,
              });
            }}
          />
        </div>
        <h3 className="text-info font-bold">Brew</h3>
        <div className="flex flex-col bg-secondary gap-3 rounded-xl">
          <input
            required
            className="input input-bordered input-sm w-full max-w-xs self-center mt-3 text-info"
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
            required
            className="input input-bordered input-sm w-full max-w-xs self-center text-info"
            placeholder="Amount out in grams"
            type="number"
            onChange={(event) => {
              setCoffee({
                ...coffee,
                amountOut: parseInt(event.target.value),
              });
            }}
          />
          <input
            className="input input-bordered input-sm w-full max-w-xs self-center text-info"
            placeholder="Grind size"
            type="number"
            onChange={(event) => {
              setCoffee({
                ...coffee,
                grindSize: parseInt(event.target.value),
              });
            }}
          />
          <select
            className="select select-bordered w-full max-w-xs select-sm self-center text-info"
            title="brew temperature"
            placeholder="Brew temperature"
            onChange={(event) => {
              setCoffee({
                ...coffee,
                temperature: parseInt(event.target.value),
              });
            }}
          >
            <option
              defaultValue="Choose the brewing temperature self-center"
              className='className="text-info font-bold"'
            >
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
              <div className="mb-3">
                <p className="text-warning font-bold"> Brew Time: </p>
                <select
                  className="select select-bordered select-xs text-info"
                  title="minutes"
                  name="minutes"
                  onChange={handleMinutesChange}
                >
                  {minuteOptions}
                </select>
                <span> : </span>
                {/* set brew time seconds */}
                <select
                  className="select select-bordered select-xs text-info"
                  title="seconds"
                  name="seconds"
                  onChange={handleSecondsChange}
                >
                  {secondOptions}
                </select>
              </div>
            </div>
          </label>
        </div>
        <h3 className="text-info font-bold"> Tasting Notes</h3>
        {/* mapping over the chocolatey array to display every possiple choice for the user */}
        <h4 className="text-info font-semibold">Chocolatey</h4>
        <div className="flex flex-col bg-secondary rounded-xl">
          <div className="flex justify-center flex-wrap m-3">
            {chocolatey.map((note) => (
              <label
                key={`option-${note.name}`}
                className="text-center align-center justify-center m-2 text-warning"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mx-3 bg-default border-2 border-primary"
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
        <h4 className="text-info font-semibold">Fruity</h4>
        <div className="flex flex-row bg-secondary rounded-xl">
          <div className="flex justify-center flex-wrap m-3">
            {fruity.map((note) => (
              <label
                key={`option-${note.name}`}
                className="text-center align-center justify-center m-2 text-warning"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mx-3 bg-default border-2 border-primary"
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
        <h4 className="text-info font-semibold">Nutty</h4>
        <div className="flex flex-col bg-secondary rounded-xl">
          <div className="flex justify-center flex-wrap m-3">
            {nutty.map((note) => (
              <label
                key={`option-${note.name}`}
                className="text-center align-center justify-center m-2 text-warning"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mx-3 bg-default border-2 border-primary"
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
        <h4 className="text-info font-semibold">Sweet</h4>
        <div className="flex flex-col bg-secondary rounded-xl">
          <div className="flex justify-center flex-wrap m-3">
            {sweet.map((note) => (
              <label
                key={`option-${note.name}`}
                className="text-center align-center justify-center m-2 text-warning"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mx-3 bg-default border-2 border-primary"
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
        <h4 className="text-info font-semibold">Floral</h4>
        <div className="flex flex-col bg-secondary rounded-xl">
          <div className="flex justify-center flex-wrap m-3">
            {floral.map((note) => (
              <label
                key={`option-${note.name}`}
                className="text-center align-center justify-center m-2 text-warning"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mx-3 bg-default border-2 border-primary"
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
        <h4 className="text-info font-semibold">Spices</h4>
        <div className="flex flex-col bg-secondary rounded-xl">
          <div className="flex justify-center flex-wrap m-3">
            {spice.map((note) => (
              <label
                key={`option-${note.name}`}
                className="text-center align-center justify-center m-2 text-warning"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm mx-3 bg-default border-2 border-primary text-info"
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
        <h3 className="text-info font-semibold">Notes</h3>
        <div>
          <textarea
            name="notes"
            title="notes"
            className="textarea textarea-bordered border-2 border-primary text-info"
            onChange={(event) => {
              setCoffee({ ...coffee, notes: event.target.value });
            }}
          />
        </div>
      </form>
      <form
        method="post"
        onSubmit={handleOnSubmit}
        className="flex flex-col rounded-xl mb-20"
      >
        <div className="flex justify-center flex-wrap m-3">
          <input
            type="file"
            name="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        <div className="flex justify-center flex-wrap m-3">
          <button className="btn btn-outline btn-accent">Save</button>
        </div>
      </form>
    </>
  );
}
