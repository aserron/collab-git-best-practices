# Handling Pipeline Failures

This scenario demonstrates common pipeline failures and their solutions, with a particular focus on Windows EOL (End of Line) issues.

## Common Pipeline Failures

### 1. Windows EOL Issues

#### Problem Description
Your pipeline fails with errors like:
```
error: CRLF would be replaced by LF in src/components/Button.js
```

This happens because:
- Windows uses CRLF (`\r\n`) for line endings
- Unix/Linux uses LF (`\n`)
- Git is configured to handle line endings differently on different platforms

#### Solution Steps

1. **Configure Git Line Endings**
   ```bash
   # Configure Git to handle line endings automatically
   git config --global core.autocrlf true  # For Windows
   git config --global core.autocrlf input # For Linux/Mac
   ```

2. **Fix Existing Files**
   ```bash
   # Normalize line endings in the repository
   git add --renormalize .
   git commit -m "style: normalize line endings"
   ```

3. **Add .gitattributes**
   Create or update `.gitattributes`:
   ```
   # Auto detect text files and perform LF normalization
   * text=auto

   # Force specific files to use LF
   *.js text eol=lf
   *.jsx text eol=lf
   *.ts text eol=lf
   *.tsx text eol=lf
   *.json text eol=lf
   *.md text eol=lf
   *.yml text eol=lf
   *.yaml text eol=lf

   # Binary files
   *.png binary
   *.jpg binary
   *.gif binary
   ```

### 2. Linting Failures

#### Problem Description
Pipeline fails due to code style violations:
```
error: Expected indentation of 2 spaces (indent) [Error/indent]
error: Missing semicolon (semi) [Error/semi]
```

#### Solution Steps

1. **Local Linting**
   ```bash
   # Install dependencies
   npm install

   # Run linter locally
   npm run lint
   ```

2. **Auto-fix Issues**
   ```bash
   # Fix automatically fixable issues
   npm run lint -- --fix
   ```

3. **Pre-commit Hook**
   Add to `.git/hooks/pre-commit`:
   ```bash
   #!/bin/sh
   npm run lint
   ```

### 3. Test Failures

#### Problem Description
Pipeline fails due to failing tests:
```
FAIL src/components/Button.test.js
  ● Button component › should render correctly
    Expected: "Click me"
    Received: "Click Me"
```

#### Solution Steps

1. **Run Tests Locally**
   ```bash
   # Run all tests
   npm test

   # Run specific test file
   npm test Button.test.js
   ```

2. **Debug Test Failures**
   ```bash
   # Run tests in watch mode
   npm test -- --watch

   # Run tests with coverage
   npm test -- --coverage
   ```

## Best Practices

### 1. Local Development
- Run pipeline checks locally before pushing
- Use pre-commit hooks
- Maintain consistent development environment

### 2. CI Configuration
- Document pipeline requirements
- Use consistent Node.js versions
- Cache dependencies

### 3. Team Standards
- Agree on code style
- Document linting rules
- Share common configurations

## Common Pitfalls

### 1. Environment Differences
- Different Node.js versions
- Different package versions
- Different OS configurations

### 2. Cache Issues
- Stale dependencies
- Incorrect cache keys
- Cache invalidation problems

### 3. Configuration Files
- Missing or incorrect configs
- Inconsistent settings
- Environment-specific issues

## Tools and Commands

```bash
# Check Git configuration
git config --list

# Fix line endings
dos2unix filename
unix2dos filename

# Clean Git cache
git rm --cached -r .
git reset --hard

# Update dependencies
npm ci
npm install

# Run pipeline locally
npm run ci
```

## Additional Resources
- [Git Attributes Documentation](https://git-scm.com/docs/gitattributes)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 