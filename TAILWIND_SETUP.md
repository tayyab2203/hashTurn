# Tailwind CSS Setup Guide

## ✅ Tailwind CSS Integration Complete

Your project is now fully compatible with Tailwind CSS v4.

### What's Been Configured:

1. **Tailwind CSS v4** installed via `@tailwindcss/vite`
2. **Tailwind directives** added to `src/styles/global.css`
3. **Custom theme configuration** in `tailwind.config.mjs` with your brand colors
4. **Astro config** updated to use Tailwind Vite plugin

### Using Tailwind in Your Project:

#### 1. Utility Classes
You can now use Tailwind utility classes anywhere in your Astro components:

```astro
<div class="flex items-center justify-between p-4 bg-gradient-primary rounded-lg">
  <h1 class="text-2xl font-bold text-secondary">Hello Tailwind!</h1>
</div>
```

#### 2. Custom Colors
Your brand colors are available as Tailwind utilities:

- `bg-primary`, `text-primary`, `border-primary`
- `bg-secondary`, `text-secondary`, `border-secondary`
- `bg-accent`, `text-accent`, `border-accent`

With variants:
- `bg-primary-light`, `bg-primary-dark`
- `bg-secondary-light`, `bg-secondary-dark`
- `bg-accent-light`, `bg-accent-dark`

#### 3. Custom Spacing
Your spacing scale is available:
- `p-xs`, `p-sm`, `p-md`, `p-lg`, `p-xl`, `p-2xl`, `p-3xl`
- `m-xs`, `m-sm`, `m-md`, `m-lg`, `m-xl`, `m-2xl`, `m-3xl`

#### 4. Custom Shadows
- `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-glow`

#### 5. Custom Gradients
- `bg-gradient-primary`
- `bg-gradient-secondary`
- `bg-gradient-hero`
- `bg-gradient-card`

#### 6. Custom Border Radius
- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`

### Example Usage:

```astro
---
// src/components/Example.astro
---

<div class="container mx-auto px-4 py-8">
  <div class="bg-gradient-primary rounded-xl p-6 shadow-lg">
    <h2 class="text-3xl font-bold text-white mb-4">
      Using Tailwind CSS
    </h2>
    <p class="text-white/90 mb-4">
      This card uses Tailwind utility classes with your custom theme.
    </p>
    <button class="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md transition-colors">
      Get Started
    </button>
  </div>
</div>
```

### Mixing Tailwind with Custom CSS:

You can still use your existing CSS custom properties alongside Tailwind:

```astro
<div class="p-4 rounded-lg" style="background: var(--gradient-primary);">
  <!-- Mix Tailwind utilities with CSS variables -->
</div>
```

### Responsive Design:

Use Tailwind's responsive breakpoints:

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Responsive grid -->
</div>
```

### Dark Mode:

Tailwind's dark mode works with your existing `[data-theme="dark"]` setup:

```astro
<div class="bg-white dark:bg-secondary text-secondary dark:text-white">
  <!-- Dark mode support -->
</div>
```

### Build & Development:

- **Development**: `npm run dev` - Tailwind will compile automatically
- **Build**: `npm run build` - Tailwind classes are purged and optimized

### Files Modified:

1. `astro.config.mjs` - Added Tailwind Vite plugin
2. `src/styles/global.css` - Added `@import "tailwindcss";`
3. `tailwind.config.mjs` - Custom theme configuration
4. `package.json` - Tailwind dependencies installed

### Next Steps:

1. Start using Tailwind utility classes in your components
2. Gradually migrate existing CSS to Tailwind where it makes sense
3. Keep using CSS custom properties for complex animations and dynamic values
4. Use Tailwind for layout, spacing, colors, and typography

Your project is now fully compatible with Tailwind CSS! 🎉


