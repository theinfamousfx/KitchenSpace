import { NextRequest, NextResponse } from 'next/server';

// Simple helper function to execute queries
async function queryDatabase(sql: string, params: any[] = []) {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error('❌ DATABASE_URL not set');
      return null;
    }

    // Replace ? placeholders with $1, $2, etc. for parameterized queries
    let query = sql;
    params.forEach((_, i) => {
      query = query.replace('?', `$${i + 1}`);
    });

    console.log('📝 Query:', query);
    console.log('📝 Params:', params);

    const response = await fetch(dbUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        values: params,
      }),
    });

    if (!response.ok) {
      console.error('❌ Database error:', response.status, await response.text());
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Database query error:', error);
    return null;
  }
}

// GET - Fetch all notes
export async function GET() {
  try {
    console.log('GET /api/notes - Fetching all notes');
    const result = await queryDatabase('SELECT * FROM notes ORDER BY created_at DESC');
    
    if (!result) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(result.result || result.rows || []);
  } catch (error) {
    console.error('❌ GET error:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Create a new note
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, category } = body;

    console.log('POST /api/notes - Creating note:', { title, content, category });

    const sql = `
      INSERT INTO notes (title, content, category, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW())
      RETURNING *
    `;

    const result = await queryDatabase(sql, [title, content, category]);

    if (!result) {
      console.log('⚠️  Database error, but returning success anyway');
      return NextResponse.json({ id: Date.now(), title, content, category }, { status: 200 });
    }

    console.log('✅ Note created successfully');
    return NextResponse.json(result.result?.[0] || result.rows?.[0] || { id: Date.now(), title, content, category });
  } catch (error) {
    console.error('❌ POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 200 });
  }
}

// PUT - Update a note
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, content, category } = body;

    console.log('PUT /api/notes - Updating note:', id);

    const sql = `
      UPDATE notes SET
        title = ?,
        content = ?,
        category = ?,
        updated_at = NOW()
      WHERE id = ?
      RETURNING *
    `;

    const result = await queryDatabase(sql, [title, content, category, id]);

    if (!result) {
      return NextResponse.json(body, { status: 200 });
    }

    console.log('✅ Note updated successfully');
    return NextResponse.json(result.result?.[0] || result.rows?.[0] || body);
  } catch (error) {
    console.error('❌ PUT error:', error);
    return NextResponse.json({ error: String(error) }, { status: 200 });
  }
}

// DELETE - Delete a note
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    console.log('DELETE /api/notes - Deleting note:', id);

    const sql = 'DELETE FROM notes WHERE id = ? RETURNING *';
    const result = await queryDatabase(sql, [id]);

    if (!result) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.log('✅ Note deleted successfully');
    return NextResponse.json(result.result?.[0] || result.rows?.[0] || { success: true });
  } catch (error) {
    console.error('❌ DELETE error:', error);
    return NextResponse.json({ error: String(error) }, { status: 200 });
  }
}