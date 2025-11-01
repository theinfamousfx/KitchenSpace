import { NextRequest, NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

export async function GET() {
  try {
    if (!connectionString) {
      console.error('DATABASE_URL not set');
      return NextResponse.json([], { status: 500 });
    }

    const pool = new Pool({ connectionString });
    const result = await pool.query('SELECT * FROM recipes ORDER BY created_at DESC');
    await pool.end();
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET /api/recipes error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!connectionString) {
      console.error('DATABASE_URL not set');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = await req.json();
    const {
      title,
      cuisine,
      category,
      difficulty_level,
      description,
      yield_amount,
      yield_unit,
      prep_time_minutes,
      cook_time_minutes,
      ingredients,
      instructions,
      serving_suggestions,
      tags,
      notes,
    } = body;

    const pool = new Pool({ connectionString });
    const query = `
      INSERT INTO recipes (
        title, cuisine, category, difficulty_level, description,
        yield_amount, yield_unit, prep_time_minutes, cook_time_minutes,
        ingredients, instructions, serving_suggestions, tags, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;

    const result = await pool.query(query, [
      title,
      cuisine,
      category,
      difficulty_level,
      description,
      yield_amount,
      yield_unit,
      prep_time_minutes,
      cook_time_minutes,
      ingredients,
      instructions,
      serving_suggestions,
      tags,
      notes,
    ]);

    await pool.end();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('POST /api/recipes error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!connectionString) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    const pool = new Pool({ connectionString });
    const query = `
      UPDATE recipes SET
        title = $1, cuisine = $2, category = $3, difficulty_level = $4,
        description = $5, yield_amount = $6, yield_unit = $7,
        prep_time_minutes = $8, cook_time_minutes = $9,
        ingredients = $10, instructions = $11, serving_suggestions = $12,
        tags = $13, notes = $14, updated_at = CURRENT_TIMESTAMP
      WHERE id = $15
      RETURNING *
    `;

    const result = await pool.query(query, [
      updates.title,
      updates.cuisine,
      updates.category,
      updates.difficulty_level,
      updates.description,
      updates.yield_amount,
      updates.yield_unit,
      updates.prep_time_minutes,
      updates.cook_time_minutes,
      updates.ingredients,
      updates.instructions,
      updates.serving_suggestions,
      updates.tags,
      updates.notes,
      id,
    ]);

    await pool.end();
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('PUT /api/recipes error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!connectionString) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }

    const pool = new Pool({ connectionString });
    const query = 'DELETE FROM recipes WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    await pool.end();

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('DELETE /api/recipes error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
