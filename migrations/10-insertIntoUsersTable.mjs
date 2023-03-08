const users = [
  {
    id: 1,
    user_name: 'a',
    first_name: 'a',
    last_name: 'a',
    password_hash: 'a',
  },
  {
    id: 2,
    user_name: 'b',
    first_name: 'b',
    last_name: 'b',
    password_hash: 'b',
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
