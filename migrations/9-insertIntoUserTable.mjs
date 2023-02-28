export async function up(sql) {
  await sql`
  INSERT INTO users (username, password, email)
  VALUES ('admin', 'admin', 'admin@admin.at');
  `;
}

export async function down(sql) {
  await sql`DELETE FROM users WHERE username = 'admin'`;
}
