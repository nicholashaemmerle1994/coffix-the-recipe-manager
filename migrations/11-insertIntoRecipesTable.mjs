const recipes = [
  {
    user_id: 1,
    category_id: 3,
    coffee: 'Low Caf',
    roaster: 'Freid Hats',
    amount_in: 20,
    amount_out: 41,
    grind_size: 13,
    brew_temperature: 93,
    brew_time_minutes: 0,
    brew_time_seconds: 29,
    notes: '',
    picture_url: '/lowcaf.png',
  },
  {
    user_id: 5,
    category_id: 2,
    coffee: 'Miscela BLU Linea Bar',
    roaster: 'Caffe Borbone',
    amount_in: 45,
    amount_out: 390,
    grind_size: 60,
    brew_temperature: 97,
    brew_time_minutes: 4,
    brew_time_seconds: 30,
    notes: '',
    picture_url: '/miscala.png',
  },
  {
    user_id: 4,
    category_id: 1,
    coffee: 'Miscela Flor',
    roaster: 'ReKico',
    amount_in: 18,
    amount_out: 39,
    grind_size: 12,
    brew_temperature: 94,
    brew_time_minutes: 0,
    brew_time_seconds: 31,
    notes: '',
    picture_url: '/Miscelaflor.png',
  },
  {
    user_id: 2,
    category_id: 5,
    coffee: 'Miscela Bar Penelope',
    roaster: 'Cafe Armeno',
    amount_in: 20,
    amount_out: 250,
    grind_size: 45,
    brew_temperature: 100,
    brew_time_minutes: 3,
    brew_time_seconds: 30,
    notes: '',
    picture_url: '/penelope.png',
  },
  {
    user_id: 15,
    category_id: 4,
    coffee: 'Espresso Prestige',
    roaster: 'Kimbo',
    amount_in: 35,
    amount_out: 350,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 2,
    brew_time_seconds: 44,
    notes: '',
    picture_url: '/kimbo.png',
  },
  {
    user_id: 4,
    category_id: 3,
    coffee: 'Aurelia',
    roaster: 'Kanzi Kaffee',
    amount_in: 15,
    amount_out: 220,
    grind_size: 3,
    brew_temperature: 100,
    brew_time_minutes: 2,
    brew_time_seconds: 0,
    notes: 'This is a test note',
    picture_url: 'kanzi.png',
  },
  {
    user_id: 1,
    category_id: 2,
    coffee: 'Miscela Pridom',
    roaster: 'Haiti',
    amount_in: 35,
    amount_out: 350,
    grind_size: 15,
    brew_temperature: 97,
    brew_time_minutes: 3,
    brew_time_seconds: 31,
    notes: '',
    picture_url: '/Pridom.png',
  },
  {
    user_id: 6,
    category_id: 1,
    coffee: 'Edition Trieste',
    roaster: 'Harry & Phils',
    amount_in: 18,
    amount_out: 36,
    grind_size: 12,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 29,
    notes: '',
    picture_url: '/harry.png',
  },
  {
    user_id: 8,
    category_id: 1,
    coffee: 'Miscela Oro Espresso',
    roaster: 'Lollo Caffe',
    amount_in: 18,
    amount_out: 33,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 35,
    notes: '',
    picture_url: '/lollo.png',
  },
  {
    user_id: 9,
    category_id: 1,
    coffee: 'Caffe Azeglio',
    roaster: 'Haiti',
    amount_in: 16,
    amount_out: 34,
    grind_size: 11,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 26,
    notes: '',
    picture_url: '/haiti.png',
  },
  {
    user_id: 15,
    category_id: 3,
    coffee: 'Rosso',
    roaster: 'Toscaffe',
    amount_in: 18,
    amount_out: 200,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 2,
    brew_time_seconds: 1,
    notes: 'Added about 50 ml of hot water, do dilute the coffee a bit',
    picture_url: '/rosso.png',
  },
  {
    user_id: 1,
    category_id: 3,
    coffee: 'Miscela Napoli',
    roaster: 'Passalacqua',
    amount_in: 17,
    amount_out: 211,
    grind_size: 45,
    brew_temperature: 97,
    brew_time_minutes: 1,
    brew_time_seconds: 46,
    notes: 'Probably should have used a finer grind',
    picture_url: '/Passalacqua.png',
  },
  {
    user_id: 11,
    category_id: 1,
    coffee: 'Robusto Argento',
    roaster: 'Saccaria Caffe',
    amount_in: 18,
    amount_out: 37,
    grind_size: 13,
    brew_temperature: 94,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'Had the most chocolatey flavor of any espresso I have had',
    picture_url: '/Robustoargento.png',
  },
  {
    user_id: 4,
    category_id: 2,
    coffee: 'Brazil',
    roaster: 'Friedhats',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/brazil.png',
  },
  {
    user_id: 3,
    category_id: 5,
    coffee: 'Indonesia Gyo Bener Meriah',
    roaster: 'Friedhats',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/Indonesiagyobenermeriah.png',
  },
  {
    user_id: 10,
    category_id: 4,
    coffee: 'CAFÉ CRÈME SCHÜMLI',
    roaster: 'Alps Coffee',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/schülmi.png',
  },
  {
    user_id: 11,
    category_id: 3,
    coffee: 'Rocky Mountains Blend',
    roaster: 'Grizzly Speciality Coffee',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/Rockymountainsblend.png',
  },
  {
    user_id: 7,
    category_id: 5,
    coffee: 'Espresso Perfetto Blend',
    roaster: 'Inpetto',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/inpetto.png',
  },
  {
    user_id: 4,
    category_id: 1,
    coffee: '100% Arabica',
    roaster: 'Espresso Perfetto',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/100.png',
  },
  {
    user_id: 1,
    category_id: 1,
    coffee: 'Oro',
    roaster: 'Danesi',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/densi.png',
  },
  {
    user_id: 13,
    category_id: 2,
    coffee: 'Miscela Blu',
    roaster: 'Caffe Diemme',
    amount_in: 18,
    amount_out: 36,
    grind_size: 3,
    brew_temperature: 97,
    brew_time_minutes: 0,
    brew_time_seconds: 30,
    notes: 'These are my great notes',
    picture_url: '/diemme.webp',
  },
];

export async function up(sql) {
  await sql`
  INSERT INTO recipes ${sql(
    recipes,
    'user_id',
    'category_id',
    'coffee',
    'roaster',
    'amount_in',
    'amount_out',
    'grind_size',
    'brew_temperature',
    'brew_time_minutes',
    'brew_time_seconds',
    'notes',
    'picture_url',
  )}
  `;
}

export async function down(sql) {
  await sql`
  DELETE FROM recipes;
  `;
}
