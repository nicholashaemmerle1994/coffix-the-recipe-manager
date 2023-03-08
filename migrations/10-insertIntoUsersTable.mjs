const users = [
  {
    id: 1,
    user_name: 'stephaniepahr',
    first_name: 'Stephanie',
    last_name: 'Pahr',
    password_hash: 'a',
  },
  {
    id: 2,
    user_name: 'nicholashämmerle',
    first_name: 'Nicholas',
    last_name: 'Hämmerle',
    password_hash: 'b',
  },
  {
    id: 3,
    user_name: 'johannesluckas',
    first_name: 'Johannes',
    last_name: 'Luckas',
    password_hash: 'c',
  },
  {
    id: 4,
    user_name: 'chrisbumstead',
    first_name: 'Chris',
    last_name: 'Bumstead',
    password_hash: 'd',
  },
  {
    id: 5,
    user_name: 'ronniecoleman',
    first_name: 'Ronnie',
    last_name: 'Coleman',
    password_hash: 'e',
  },
  {
    id: 6,
    user_name: 'jameshoffmann',
    first_name: 'James',
    last_name: 'Hoffmann',
    password_hash: 'f',
  },
  {
    id: 7,
    user_name: 'lancehedrick',
    first_name: 'Lance',
    last_name: 'Hedrick',
    password_hash: 'g',
  },
  {
    id: 8,
    user_name: 'petermckinnon',
    first_name: 'Peter',
    last_name: 'McKinnon',
    password_hash: 'h',
  },
  {
    id: 9,
    user_name: 'danielkoller',
    first_name: 'Daniel',
    last_name: 'Koller',
    password_hash: 'i',
  },
  {
    id: 10,
    user_name: 'davidschmidt',
    first_name: 'David',
    last_name: 'Schmidt',
    password_hash: 'j',
  },
  {
    id: 11,
    user_name: 'larahämmerle',
    first_name: 'Lara',
    last_name: 'Hämmerle',
    password_hash: 'k',
  },
  {
    id: 12,
    user_name: 'marcpeternell',
    first_name: 'Marc',
    last_name: 'Peternell',
    password_hash: 'l',
  },
  {
    id: 13,
    user_name: 'sandraeisenkölbl',
    first_name: 'Sandra',
    last_name: 'Eisenkölbl',
    password_hash: 'm',
  },
  {
    id: 14,
    user_name: 'sonjapahr',
    first_name: 'Sonja',
    last_name: 'Pahr',
    password_hash: 'n',
  },
  {
    id: 15,
    user_name: 'klausheinrich',
    first_name: 'Klaus',
    last_name: 'Heinrich',
    password_hash: 'o',
  },
  {
    id: 16,
    user_name: 'michaelriegger',
    first_name: 'Michael',
    last_name: 'Riegger',
    password_hash: 'p',
  },
  {
    id: 17,
    user_name: 'andreasRiegger',
    first_name: 'Andreas',
    last_name: 'Riegger',
    password_hash: 'q',
  },
  {
    id: 18,
    user_name: 'florinpfund',
    first_name: 'Florin',
    last_name: 'Pfund',
    password_hash: 'r',
  },
];

export async function up(sql) {
  await sql`
  INSERT INTO users ${sql(
    users,
    'user_name',
    'first_name',
    'last_name',
    'password_hash',
  )}
  `;
}

export async function down(sql) {
  for (const user of users) {
    await sql`DELETE FROM users WHERE id = ${user.id}`;
  }
}
