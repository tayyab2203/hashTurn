import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const BLOG_DATA_PATH = join(process.cwd(), 'src', 'data', 'blog.json');

// Simple authentication check (you should enhance this with proper auth)
function isAuthenticated(request) {
  // For now, check for a simple API key in headers
  // In production, use proper authentication (JWT, session, etc.)
  const apiKey = request.headers.get('x-api-key');
  const authHeader = request.headers.get('authorization');
  
  // Allow if API key matches or if running in dev mode
  // TODO: Replace with proper authentication
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  return apiKey === process.env.ADMIN_API_KEY || authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

// GET - List all blogs
export async function GET({ request }) {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileContent = await readFile(BLOG_DATA_PATH, 'utf-8');
    const blogs = JSON.parse(fileContent);

    return new Response(JSON.stringify({ blogs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error reading blogs:', error);
    return new Response(JSON.stringify({ error: 'Failed to read blogs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST - Create new blog
export async function POST({ request }) {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { title, description, date, author, category, excerpt, slug } = body;

    // Validation
    if (!title || !description || !category || !excerpt) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate slug if not provided
    const blogSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Read existing blogs
    const fileContent = await readFile(BLOG_DATA_PATH, 'utf-8');
    const blogs = JSON.parse(fileContent);

    // Check if slug already exists
    if (blogs.some((blog) => blog.slug === blogSlug)) {
      return new Response(JSON.stringify({ error: 'Blog with this slug already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create new blog object
    const newBlog = {
      slug: blogSlug,
      title,
      description,
      date: date || new Date().toISOString().split('T')[0],
      author: author || 'Hashturn Team',
      category,
      excerpt,
    };

    // Add to blogs array
    blogs.push(newBlog);

    // Write back to file
    await writeFile(BLOG_DATA_PATH, JSON.stringify(blogs, null, 2), 'utf-8');

    return new Response(JSON.stringify({ message: 'Blog created successfully', blog: newBlog }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to create blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

