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
        'SELECT * FROM cookbooks WHERE id = $1 AND deleted_at IS NULL',
        [id]
      );
      return NextResponse.json(result.rows[0] || null);
    }

    const result = await pool.query(
      'SELECT * FROM cookbooks WHERE deleted_at IS NULL ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET /api/cookbooks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cookbooks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      author,
      isbn,
      publication_year,
      publisher,
      description,
      cuisine_type,
      difficulty_level,
      page_count,
      format,
      location,
      rating,
      notes,
      tags,
    } = body;

    const result = await pool.query(
      `INSERT INTO cookbooks (
        title, author, isbn, publication_year, publisher, description,
        cuisine_type, difficulty_level, page_count, format, location,
        rating, notes, tags
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        title,
        author,
        isbn,
        publication_year,
        publisher,
        description,
        cuisine_type,
        difficulty_level,
        page_count,
        format,
        location,
        rating,
        notes,
        tags || [],
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/cookbooks error:', error);
    return NextResponse.json(
      { error: 'Failed to create cookbook' },
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
      `UPDATE cookbooks SET ${fields}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${values.length} AND deleted_at IS NULL
       RETURNING *`,
      values
    );

    return NextResponse.json(result.rows[0] || null);
  } catch (error) {
    console.error('PUT /api/cookbooks error:', error);
    return NextResponse.json(
      { error: 'Failed to update cookbook' },
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
      `UPDATE cookbooks SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('DELETE /api/cookbooks error:', error);
    return NextResponse.json(
      { error: 'Failed to delete cookbook' },
      { status: 500 }
    );
  }
}
