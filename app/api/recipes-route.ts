import { Pool } from 'pg';
import { NextResponse } from 'next/server';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const result = await pool.query(
        'SELECT * FROM recipes WHERE id = $1 AND deleted_at IS NULL',
        [id]
      );
      return NextResponse.json(result.rows[0] || null);
    }

    const result = await pool.query(
      'SELECT * FROM recipes WHERE deleted_at IS NULL ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET /api/recipes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      cuisine,
      difficulty_level,
      yield_amount,
      yield_unit,
      prep_time_minutes,
      cook_time_minutes,
      total_time_minutes,
      ingredients,
      instructions,
      notes,
      tags,
      allergens,
      source_url,
      source_book,
      is_favorite,
    } = body;

    const result = await pool.query(
      `INSERT INTO recipes (
        title, description, cuisine, difficulty_level, yield_amount, yield_unit,
        prep_time_minutes, cook_time_minutes, total_time_minutes, ingredients,
        instructions, notes, tags, allergens, source_url, source_book, is_favorite
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        title,
        description,
        cuisine,
        difficulty_level,
        yield_amount,
        yield_unit,
        prep_time_minutes,
        cook_time_minutes,
        total_time_minutes,
        ingredients ? JSON.stringify(ingredients) : null,
        instructions,
        notes,
        tags || [],
        allergens || [],
        source_url,
        source_book,
        is_favorite || false,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/recipes error:', error);
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const fields = Object.keys(updates)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const values = Object.values(updates);
    values.push(id);

    const result = await pool.query(
      `UPDATE recipes SET ${fields}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${values.length} AND deleted_at IS NULL
       RETURNING *`,
      values
    );

    return NextResponse.json(result.rows[0] || null);
  } catch (error) {
    console.error('PUT /api/recipes error:', error);
    return NextResponse.json(
      { error: 'Failed to update recipe' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE recipes SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('DELETE /api/recipes error:', error);
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    );
  }
}
