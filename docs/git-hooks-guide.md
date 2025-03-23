# Git Hooks Guide

This guide explains how to set up and use Git hooks effectively in your project.

## Table of Contents
1. [Introduction to Git Hooks](#introduction-to-git-hooks)
2. [Hook Types and Use Cases](#hook-types-and-use-cases)
3. [Setting Up Hooks](#setting-up-hooks)
4. [Common Hook Examples](#common-hook-examples)
5. [Troubleshooting](#troubleshooting)

## Introduction to Git Hooks

Git hooks are scripts that Git executes before or after events such as: commit, push, and receive. They can be used to:
- Enforce coding standards
- Run tests
- Check commit messages
- Prevent sensitive data commits
- Automate deployment
- Notify team members

## Hook Types and Use Cases

### Client-side Hooks

1. **pre-commit**
   - Runs before commit is created
   - Used for code quality checks
   - Linting and formatting
   - Preventing sensitive data

2. **prepare-commit-msg**
   - Runs before commit message editor
   - Used to modify default messages
   - Add ticket numbers
   - Enforce message format

3. **commit-msg**
   - Runs after commit message is created
   - Validate message format
   - Check issue references
   - Enforce conventions

4. **post-commit**
   - Runs after commit is created
   - Notifications
   - Documentation updates
   - Build triggers

5. **pre-push**
   - Runs before push completes
   - Run full test suite
   - Check branch names
   - Verify build process

### Server-side Hooks

1. **pre-receive**
   - Runs when receiving push
   - Access control
   - Policy enforcement
   - Branch protection

2. **update**
   - Runs per branch when pushing
   - Branch-specific checks
   - Permission validation
   - Reference updates

3. **post-receive**
   - Runs after push completes
   - Deployment triggers
   - Notifications
   - Cache updates

## Setting Up Hooks

### Local Setup

1. **Create Hooks Directory**
   ```bash
   mkdir -p .git-hooks
   ```

2. **Configure Git**
   ```bash
   git config core.hooksPath .git-hooks
   ```

3. **Make Hooks Executable**
   ```bash
   chmod +x .git-hooks/*
   ```

### Team Setup

1. **Add Hooks to Repository**
   ```bash
   # Add hooks directory
   git add .git-hooks
   
   # Update README
   echo "Run: git config core.hooksPath .git-hooks" >> README.md
   ```

2. **Create Setup Script**
   ```bash
   # setup-hooks.sh
   #!/bin/sh
   git config core.hooksPath .git-hooks
   chmod +x .git-hooks/*
   ```

## Common Hook Examples

### 1. Pre-commit Linting
```bash
#!/bin/sh
# .git-hooks/pre-commit

# Run linting
npm run lint

# Check exit code
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix errors before committing."
    exit 1
fi
```

### 2. Commit Message Format
```bash
#!/bin/sh
# .git-hooks/commit-msg

# Get commit message
MSG=$(cat $1)

# Check format
if ! echo "$MSG" | grep -qE "^(feat|fix|docs|style|refactor|test|chore): .+"; then
    echo "Invalid commit message format. Use: type: message"
    exit 1
fi
```

### 3. Pre-push Tests
```bash
#!/bin/sh
# .git-hooks/pre-push

# Run tests
npm test

# Check exit code
if [ $? -ne 0 ]; then
    echo "Tests failed. Please fix before pushing."
    exit 1
fi
```

### 4. Prevent Sensitive Data
```bash
#!/bin/sh
# .git-hooks/pre-commit

# Check for sensitive patterns
if git diff --cached | grep -i "password\|secret\|key"; then
    echo "Possible sensitive data detected. Please remove before committing."
    exit 1
fi
```

## Advanced Hook Examples

### 1. Branch Name Validation
```bash
#!/bin/sh
# .git-hooks/pre-commit

branch=$(git rev-parse --abbrev-ref HEAD)
if ! echo "$branch" | grep -qE "^(feature|bugfix|hotfix)/[a-z0-9-]+$"; then
    echo "Invalid branch name. Use: type/description"
    exit 1
fi
```

### 2. Jira Integration
```bash
#!/bin/sh
# .git-hooks/prepare-commit-msg

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
JIRA_ID=$(echo "$BRANCH_NAME" | grep -oE "[A-Z]+-[0-9]+")

if [ ! -z "$JIRA_ID" ]; then
    echo "[$JIRA_ID] $(cat $1)" > $1
fi
```

### 3. Auto-formatting
```bash
#!/bin/sh
# .git-hooks/pre-commit

# Format staged files
FILES=$(git diff --cached --name-only --diff-filter=ACM "*.js" "*.jsx")
if [ -n "$FILES" ]; then
    echo "$FILES" | xargs prettier --write
    echo "$FILES" | xargs git add
fi
```

## Troubleshooting

### Common Issues

1. **Hooks Not Running**
   ```bash
   # Check hook path
   git config --get core.hooksPath
   
   # Check permissions
   ls -la .git-hooks/
   
   # Make executable
   chmod +x .git-hooks/*
   ```

2. **Hook Errors**
   ```bash
   # Debug hook
   bash -x .git-hooks/hook-name
   
   # Check exit codes
   echo $?
   ```

3. **Skip Hooks**
   ```bash
   # Skip pre-commit
   git commit --no-verify
   
   # Skip push hooks
   git push --no-verify
   ```

### Best Practices

1. **Performance**
   - Only process staged files
   - Use efficient commands
   - Cache when possible

2. **User Experience**
   - Clear error messages
   - Provide fix instructions
   - Allow manual override

3. **Maintenance**
   - Document hooks
   - Version control
   - Regular updates

## Additional Resources
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Husky](https://github.com/typicode/husky)
- [Pre-commit Framework](https://pre-commit.com/)
- [Git Template Directory](https://git-scm.com/docs/git-init#_template_directory) 