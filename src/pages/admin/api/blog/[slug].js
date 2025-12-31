import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const BLOG_DATA_PATH = join(process.cwd(), 'src', 'data', 'blog.json');

// Simple authentication check
function isAuthenticated(request) {
  const apiKey = request.headers.get('x-api-key');
  const authHeader = request.headers.get('authorization');
  
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  return apiKey === process.env.ADMIN_API_KEY || authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

// PUT - Update blog
export async function PUT({ params, request }) {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { title, description, date, author, category, excerpt, newSlug } = body;

    // Read existing blogs
    const fileContent = await readFile(BLOG_DATA_PATH, 'utf-8');
    const blogs = JSON.parse(fileContent);

    // Find blog index
    const blogIndex = blogs.findIndex((blog) => blog.slug === slug);
    if (blogIndex === -1) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if new slug already exists (if changing slug)
    if (newSlug && newSlug !== slug) {
      if (blogs.some((blog) => blog.slug === newSlug)) {
        return new Response(JSON.stringify({ error: 'Blog with this slug already exists' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Update blog
    const updatedBlog = {
      ...blogs[blogIndex],
      ...(title && { title }),
      ...(description && { description }),
      ...(date && { date }),
      ...(author && { author }),
      ...(category && { category }),
      ...(excerpt && { excerpt }),
      ...(newSlug && { slug: newSlug }),
    };

    blogs[blogIndex] = updatedBlog;

    // Write back to file
    await writeFile(BLOG_DATA_PATH, JSON.stringify(blogs, null, 2), 'utf-8');

    return new Response(JSON.stringify({ message: 'Blog updated successfully', blog: updatedBlog }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to update blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE - Delete blog
export async function DELETE({ params, request }) {
  try {
    if (!isAuthenticated(request)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Read existing blogs
    const fileContent = await readFile(BLOG_DATA_PATH, 'utf-8');
    const blogs = JSON.parse(fileContent);

    // Find blog index
    const blogIndex = blogs.findIndex((blog) => blog.slug === slug);
    if (blogIndex === -1) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Remove blog
    blogs.splice(blogIndex, 1);

    // Write back to file
    await writeFile(BLOG_DATA_PATH, JSON.stringify(blogs, null, 2), 'utf-8');

    return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

