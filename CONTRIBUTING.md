# Contributing to ClearSkin

Thank you for your interest in contributing to ClearSkin! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help create a welcoming environment for all contributors

## Getting Started

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Claude-Projects.git
   cd Claude-Projects
   ```

3. **Set up the development environment**
   ```bash
   npm install
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Run the development server**
   ```bash
   npm run dev
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments for complex logic

3. **Test your changes**
   - Test on different screen sizes
   - Verify functionality works as expected
   - Check for console errors

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use type inference where appropriate

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop types

### Styling

- Use Tailwind CSS utility classes
- Follow the design system in `tailwind.config.js`
- Use light font weights (font-light, font-normal)
- Mobile-first responsive design

### File Organization

- Place components in appropriate directories
- Group related files together
- Use index files for cleaner imports
- Follow the existing project structure

## Commit Guidelines

We follow conventional commits for clear commit history:

### Format

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(scan): add image compression before upload
fix(analysis): correct ingredient parsing logic
docs(readme): update installation instructions
style(button): improve hover states
refactor(api): simplify error handling
perf(images): optimize loading with lazy loading
test(api): add unit tests for analyze endpoint
chore(deps): update dependencies
```

## Pull Request Process

1. **Ensure your code follows the coding standards**

2. **Update documentation**
   - Update README if needed
   - Add JSDoc comments for new functions
   - Update type definitions

3. **Test thoroughly**
   - Test on desktop and mobile
   - Verify no console errors
   - Check for accessibility issues

4. **Fill out the PR template**
   - Describe what changes you made
   - Explain why you made them
   - Include screenshots for UI changes
   - Link related issues

5. **Wait for review**
   - Address any feedback
   - Make requested changes
   - Keep the conversation respectful

6. **Merge**
   - Once approved, a maintainer will merge your PR
   - Delete your branch after merging

## Testing

### Manual Testing

1. **Test on multiple devices**
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Android Chrome)
   - Tablet

2. **Test user flows**
   - Scan product workflow
   - Product comparison
   - Profile updates
   - Authentication

3. **Test edge cases**
   - Poor image quality
   - Missing data
   - Network errors
   - Large datasets

### Automated Testing (Future)

- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright

## Questions?

If you have questions:
- Open an issue with the "question" label
- Check existing issues and PRs
- Review the documentation

Thank you for contributing to ClearSkin!
