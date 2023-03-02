const category = [
  { id: 1, name: 'Espresso', icon: '/portafilter.png', site_name: 'espresso' },
  {
    id: 2,
    name: 'French Press',
    icon: '/frenchpress.png',
    site_name: 'frenchpress',
  },
  { id: 3, name: 'AeroPress', icon: '/aeropress.png', site_name: 'aeropress' },
  { id: 4, name: 'V60', icon: '/v60.png', site_name: 'v60' },
  { id: 5, name: 'Moka Pot', icon: '/moka.png', site_name: 'moka' },
];

export async function up(sql) {
  await sql`
  INSERT INTO categories ${sql(category, 'name', 'icon', 'site_name')}
  `;
}

export async function down(sql) {
  for (const cat of category) {
    await sql`DELETE FROM categories WHERE id = ${cat.id}`;
  }
}
