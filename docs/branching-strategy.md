# Branching Strategy

This document outlines the branching strategy used in this repository to maintain code quality and streamline the development process.

## Overview

Our branching strategy follows a Git Flow-inspired model with some modifications to suit our needs. The strategy is designed to:
- Keep the main branch stable and production-ready
- Provide a clear development workflow
- Enable parallel development
- Maintain code quality
- Support continuous integration

## Branch Types

### Main Branches

#### `main`
- Purpose: Production-ready code
- Protection: Strict protection rules
- Usage: Release deployments only
- Naming: Always `main`

#### `dev`
- Purpose: Main development branch
- Protection: Moderate protection rules
- Usage: Integration point for features
- Naming: Always `dev`

### Supporting Branches

#### Feature Branches
- Purpose: New features and enhancements
- Branch from: `dev`
- Merge to: `dev`
- Naming: `feature/issue-number-description`
- Example: `feature/123-express-setup`

#### Bugfix Branches
- Purpose: Bug fixes
- Branch from: `dev`
- Merge to: `dev`
- Naming: `bugfix/issue-number-description`
- Example: `bugfix/124-fix-routing`

#### Release Branches
- Purpose: Version preparation
- Branch from: `dev`
- Merge to: `main` and `dev`
- Naming: `release/vX.Y.Z`
- Example: `release/v1.0.0`

## Branch Protection Rules

### `main` Branch
- Requires pull request reviews
- No direct pushes
- Must be up to date before merging
- Requires CI checks to pass
- Requires branch to be up to date
- Requires linear history

### `dev` Branch
- Requires pull request reviews
- No direct pushes
- Must pass CI checks
- Requires branch to be up to date
- Allows merge commits

## Development Workflow

### Starting New Work
1. Ensure you're on the `dev` branch and it's up to date
2. Create a new feature branch:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/issue-number-description
   ```

### During Development
1. Make commits following conventional commit format
2. Push changes regularly:
   ```bash
   git push -u origin feature/issue-number-description
   ```

### Completing Work
1. Create a pull request to `dev`
2. Address any review comments
3. Ensure CI checks pass
4. Merge after approval

### Release Process
1. Create release branch from `dev`
2. Version bump and final testing
3. Create pull request to `main`
4. After approval, merge to `main`
5. Tag the release
6. Merge back to `dev`

## Best Practices

### Branch Management
- Keep branches short-lived
- Delete branches after merging
- Regularly update with `dev`
- Use meaningful branch names

### Commits
- Follow conventional commit format
- Keep commits atomic
- Write clear commit messages
- Reference issues in commits

### Pull Requests
- Keep PRs focused and small
- Update PR description as needed
- Address all review comments
- Ensure CI checks pass

### Merging
- Squash merge for feature branches
- Merge commits for release branches
- Keep commit history clean
- Resolve conflicts in PR

## Tools and Automation

### Git Hooks
- Pre-commit hooks for code quality
- Prepare-commit-msg for message format
- Pre-push for additional checks
- Post-commit for notifications

### CI/CD
- Automated testing
- Code quality checks
- Security scanning
- Dependency updates

## Troubleshooting

### Common Issues
1. Branch out of date
   ```bash
   git checkout dev
   git pull
   git checkout feature/branch
   git rebase dev
   ```

2. Merge conflicts
   ```bash
   git checkout dev
   git pull
   git checkout feature/branch
   git rebase dev
   # Resolve conflicts
   git add .
   git rebase --continue
   ```

3. Force push needed
   ```bash
   git push -f origin feature/branch
   # Use with caution!
   ```

## Support

For questions about the branching strategy:
1. Check this documentation
2. Review Git hooks documentation
3. Contact the team lead
4. Create an issue for clarification 