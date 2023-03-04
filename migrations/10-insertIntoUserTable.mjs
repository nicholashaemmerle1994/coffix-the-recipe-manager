export async function up(sql) {
  await sql`
  INSERT INTO users (username, password)
  VALUES ('admin', 'admin');
  `;
}

export async function down(sql) {
  await sql`DELETE FROM users WHERE username = 'admin'`;
}
