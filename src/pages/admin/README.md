# Blog Admin Routes

This directory contains the admin interface and API routes for managing blog posts.

## Routes

### Admin UI
- **GET** `/admin/blog` - Admin interface for managing blogs

### API Endpoints

#### List/Create Blogs
- **GET** `/admin/api/blog` - Get all blog posts
- **POST** `/admin/api/blog` - Create a new blog post

#### Update/Delete Blog
- **PUT** `/admin/api/blog/[slug]` - Update an existing blog post
- **DELETE** `/admin/api/blog/[slug]` - Delete a blog post

## Authentication

Currently, authentication is simplified:
- In **development mode** (`NODE_ENV=development`), all routes are accessible without authentication
- In **production mode**, you need to set the `ADMIN_API_KEY` environment variable

### Setting up Authentication

1. Create a `.env` file in the root directory:
```env
ADMIN_API_KEY=your-secret-api-key-here
NODE_ENV=production
```

2. When making API requests, include the API key in one of these ways:
   - Header: `x-api-key: your-secret-api-key-here`
   - Header: `Authorization: Bearer your-secret-api-key-here`

### Example API Usage

#### Create Blog
```bash
curl -X POST http://localhost:4321/admin/api/blog \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key-here" \
  -d '{
    "title": "My New Blog Post",
    "description": "Meta description",
    "excerpt": "Short excerpt",
    "category": "Development",
    "author": "Hashturn Team"
  }'
```

#### Update Blog
```bash
curl -X PUT http://localhost:4321/admin/api/blog/my-blog-slug \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-secret-api-key-here" \
  -d '{
    "title": "Updated Title",
    "newSlug": "updated-slug"
  }'
```

#### Delete Blog
```bash
curl -X DELETE http://localhost:4321/admin/api/blog/my-blog-slug \
  -H "x-api-key: your-secret-api-key-here"
```

## Blog Data Structure

Each blog post has the following structure:
```json
{
  "slug": "blog-post-slug",
  "title": "Blog Post Title",
  "description": "Meta description for SEO",
  "date": "2024-01-15",
  "author": "Hashturn Team",
  "category": "Development",
  "excerpt": "Short excerpt shown in blog listing"
}
```

## Security Recommendations

For production use, consider:
1. Implementing proper authentication (JWT, sessions, etc.)
2. Adding rate limiting
3. Adding CSRF protection
4. Restricting admin routes to specific IPs
5. Using a proper database instead of JSON files
6. Adding input validation and sanitization

## Notes

- Blog data is stored in `src/data/blog.json`
- Slugs are auto-generated from titles if not provided
- The admin UI provides a user-friendly interface for all CRUD operations

