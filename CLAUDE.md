# CSS Guidelines

## IMPORTANT: Global CSS Rules
- **DO NOT edit any CSS files in `styles/global/` unless explicitly instructed to do so**
- When creating new components (dropdowns, headers, buttons, etc.), you MUST use the existing CSS classes and styles from `styles/global/[filename].css`
- Before writing any new CSS, check the global styles folder first to see if classes already exist for what you need
- Only create new CSS if the global styles don't have what you need, and put new styles in component-specific CSS files, not in global

## Workflow
- When building UI components, always reference `styles/global/` first
- Reuse existing classes and patterns from the global stylesheet

