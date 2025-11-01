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
        'SELECT * FROM resource_links WHERE id = $1 AND deleted_at IS NULL',
        [id]
      );
      return NextResponse.json(result.rows[0] || null);
    }

    const result = await pool.query(
      'SELECT * FROM resource_links WHERE deleted_at IS NULL ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('GET /api/resource-links error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      url,
      description,
      source_website,
      category,
      tags,
      rating,
      notes,
    } = body;

    const result = await pool.query(
      `INSERT INTO resource_links (
        title, url, description, source_website, category, tags, rating, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        title,
        url,
        description,
        source_website,
        category,
        tags || [],
        rating,
        notes,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/resource-links error:', error);
    return NextResponse.json(
      { error: 'Failed to create link' },
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
      `UPDATE resource_links SET ${fields}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${values.length} AND deleted_at IS NULL
       RETURNING *`,
      values
    );

    return NextResponse.json(result.rows[0] || null);
  } catch (error) {
    console.error('PUT /api/resource-links error:', error);
    return NextResponse.json(
      { error: 'Failed to update link' },
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
      `UPDATE resource_links SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('DELETE /api/resource-links error:', error);
    return NextResponse.json(
      { error: 'Failed to delete link' },
      { status: 500 }
    );
  }
}
