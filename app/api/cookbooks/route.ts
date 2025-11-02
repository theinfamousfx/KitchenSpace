import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Neon
});

export async function GET(request: Request) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM recipes ORDER BY created_at DESC');
    client.release();
    return Response.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, category, cuisine, description, content, steps, ingredients, instructions } = data;

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO recipes (title, category, cuisine, description, content, steps, ingredients, instructions)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, category || cuisine, cuisine, description, content, steps, ingredients, instructions]
    );
    client.release();
    return Response.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return Response.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}