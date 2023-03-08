const users = [
  {
    id: 1,
    user_name: 'admin',
    first_name: 'admin',
    last_name: 'daniel',
    password_hash: 'jdsjksfdajkdsfjkdsf',
  },
  {
    id: 2,
    user_name: 'user',
    first_name: 'user',
    last_name: 'daniel',
    password_hash: 'jdsjksfdajkdsddsadsfjkdsf',
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
