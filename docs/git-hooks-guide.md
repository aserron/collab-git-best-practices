# Git Hooks Guide

This guide provides detailed information about Git hooks, their configuration, and usage in our project.

## Table of Contents
1. [Introduction](#introduction)
2. [Hook Types](#hook-types)
3. [Current Hook Configuration](#current-hook-configuration)
4. [Hook Implementation Details](#hook-implementation-details)
5. [Customizing Hooks](#customizing-hooks)
6. [Troubleshooting](#troubleshooting)

## Introduction

Git hooks are scripts that Git executes before or after events such as commit, push, and receive. They are a built-in feature of Git that allows you to automate tasks and enforce policies in your Git workflow.

## Branching Strategy

Our repository follows a structured branching strategy to maintain code quality and streamline the development process:

### Main Branches
- `main`: Production-ready code, used for releases only
- `dev`: Main development branch, integration point for features

### Branch Types and Workflow
1. **Feature Branches**
   - Branch from: `dev`
   - Naming: `feature/issue-number-description`
   - Purpose: New features, enhancements
   - Merge back to: `dev`

2. **Bugfix Branches**
   - Branch from: `dev`
   - Naming: `bugfix/issue-number-description`
   - Purpose: Bug fixes
   - Merge back to: `dev`

3. **Release Branches**
   - Branch from: `dev`
   - Naming: `release/vX.Y.Z`
   - Purpose: Version preparation
   - Merge to: `main` and `dev`

### Branch Protection Rules
- `main` branch:
  - Requires pull request reviews
  - No direct pushes
  - Must be up to date before merging
- `dev` branch:
  - Requires pull request reviews
  - No direct pushes
  - Must pass CI checks

### Workflow Example
1. Create feature branch from `dev`
2. Develop and commit changes
3. Push to remote and create pull request to `dev`
4. After review and CI checks, merge to `dev`
5. When ready for release, create release branch from `dev`
6. After testing, merge release branch to `main` and back to `dev`

### Hook Location
Hooks are stored in the `.git-hooks` directory and are automatically installed when cloning the repository.

### Hook Execution Order
```
git commit
↓
pre-commit (validates files)
↓
prepare-commit-msg (validates message)
↓
commit is created
↓
post-commit (additional checks)

git push
↓
pre-push (validates code quality)
↓
push to remote
```

## Hook Types

### Client-Side Hooks

1. **pre-commit**
   - Runs before commit is created
   - Validates staged changes
   - Can prevent commit if checks fail

2. **prepare-commit-msg**
   - Runs before commit message is finalized
   - Validates commit message format
   - Can modify commit message

3. **post-commit**
   - Runs after commit is created
   - Performs additional checks
   - Cannot prevent commit

4. **pre-push**
   - Runs before pushing to remote
   - Validates code quality
   - Can prevent push if checks fail

### Server-Side Hooks (Not Currently Used)

1. **pre-receive**
   - Runs before receiving pushed commits
   - Validates incoming changes
   - Can reject push

2. **update**
   - Runs for each branch being updated
   - Validates branch-specific rules
   - Can reject branch update

3. **post-receive**
   - Runs after receiving pushed commits
   - Performs post-push actions
   - Cannot reject push

## Current Hook Configuration

### Pre-commit Hook
```bash
# File size limit in bytes (100MB)
MAX_FILE_SIZE=104857600

# Checks:
1. Git LFS installation
2. File size limits
3. Sensitive data patterns
4. Binary file handling
```

### Prepare-commit-msg Hook
```bash
# Validates:
1. Conventional commit format
2. Subject line length (50 chars)
3. Proper capitalization
4. Imperative mood
5. Body formatting
6. WIP/TODO warnings
```

### Post-commit Hook
```bash
# Performs:
1. Commit information logging
2. JIRA ticket reference check
3. Commit signing verification
4. Branch type identification
5. Large file detection
6. Binary file detection
7. Merge conflict marker check
```

### Pre-push Hook
```bash
# Validates:
1. Branch synchronization
2. Uncommitted changes
3. Test execution
4. Linting
5. Type checking
6. Security vulnerabilities
7. Dependency status
```

## Hook Implementation Details

### Pre-commit Hook
```bash
# Key Features:
- Git LFS validation
- File size enforcement
- Sensitive data scanning
- Binary file handling

# Configuration:
MAX_FILE_SIZE=104857600  # 100MB limit
```

### Prepare-commit-msg Hook
```bash
# Commit Message Format:
<type>: <subject>

# Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Testing
- chore: Maintenance
```

### Post-commit Hook
```bash
# Information Collected:
- Commit hash
- Author details
- Commit message
- Branch information
- File statistics
```

### Pre-push Hook
```bash
# Checks Performed:
- Branch synchronization
- Code quality
- Test coverage
- Type safety
- Security
- Dependencies
```

## Customizing Hooks

### Adding New Checks
1. Edit the appropriate hook file
2. Add your check logic
3. Make the hook executable
4. Test the changes

### Modifying Existing Checks
1. Locate the check in the hook file
2. Modify the logic
3. Update any configuration
4. Test the changes

### Disabling Hooks
```bash
# Skip specific hook
git commit --no-verify

# Skip all hooks
git push --no-verify
```

## Troubleshooting

### Common Issues

1. **Hook Not Executing**
   ```bash
   # Check hook permissions
   chmod +x .git-hooks/<hook-name>
   
   # Verify hook location
   git config core.hooksPath .git-hooks
   ```

2. **Hook Failing**
   ```bash
   # Debug hook
   bash -x .git-hooks/<hook-name>
   
   # Check hook logs
   git log --oneline
   ```

3. **Performance Issues**
   ```bash
   # Optimize hook execution
   git config core.hooksPath .git-hooks
   git config core.fscache true
   ```

### Best Practices

1. **Performance**
   - Keep hooks lightweight
   - Use caching when possible
   - Avoid heavy operations

2. **Reliability**
   - Handle errors gracefully
   - Provide clear error messages
   - Log important information

3. **Maintenance**
   - Document changes
   - Test thoroughly
   - Keep hooks updated

## Additional Resources

- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git LFS Documentation](https://git-lfs.github.com/)
- [Git Security Best Practices](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work) 