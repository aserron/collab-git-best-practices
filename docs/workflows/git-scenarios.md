# Git Scenario Workflows

This document provides step-by-step workflows for handling various Git scenarios that developers commonly encounter.

## Table of Contents
1. [Large Feature Branch Management](#large-feature-branch-management)
2. [Merge Conflict Resolution](#merge-conflict-resolution)
3. [History Cleanup](#history-cleanup)
4. [Pipeline Issue Resolution](#pipeline-issue-resolution)
5. [Code Review Management](#code-review-management)

## Large Feature Branch Management

### Scenario
You're working on a large feature that:
- Takes several weeks to complete
- Involves multiple components
- Requires frequent updates from the main branch
- Has multiple developers contributing

### Workflow

1. **Initial Setup**
   ```bash
   # Create feature branch
   git checkout -b feature/large-feature develop
   
   # Create sub-feature branches if needed
   git checkout -b feature/large-feature-auth
   git checkout -b feature/large-feature-ui
   ```

2. **Regular Updates**
   ```bash
   # Update from develop (daily)
   git checkout develop
   git pull origin develop
   git checkout feature/large-feature
   git rebase develop
   ```

3. **Sub-feature Integration**
   ```bash
   # Merge sub-features
   git checkout feature/large-feature
   git merge --no-ff feature/large-feature-auth
   git merge --no-ff feature/large-feature-ui
   ```

4. **Progress Tracking**
   ```bash
   # Create WIP commits
   git commit -m "wip: implement authentication flow"
   
   # Later, squash WIP commits
   git rebase -i develop
   ```

### Best Practices
1. Create a feature roadmap document
2. Break work into smaller, reviewable chunks
3. Regular communication with team
4. Maintain documentation as you go
5. Regular integration testing

## Merge Conflict Resolution

### Scenario
You have conflicts that:
- Span multiple files
- Involve complex logic changes
- Affect critical functionality
- Include both code and configuration

### Workflow

1. **Preparation**
   ```bash
   # Create backup branch
   git checkout -b backup/feature-conflicts feature
   
   # Get latest changes
   git fetch origin
   git checkout feature
   ```

2. **Conflict Resolution**
   ```bash
   # Start rebase
   git rebase develop
   
   # For each conflict:
   vim conflicted-file.js  # Or your editor
   git add conflicted-file.js
   git rebase --continue
   ```

3. **Validation**
   ```bash
   # Run tests
   npm test
   
   # Run linting
   npm run lint
   
   # Manual testing
   npm start
   ```

### Best Practices
1. Understand both changes
2. Keep original functionality
3. Add tests for merged code
4. Document complex decisions
5. Get peer review if needed

## History Cleanup

### Scenario
Your branch has:
- Too many commits
- Poor commit messages
- Mixed concerns
- Merge commits

### Workflow

1. **Analysis**
   ```bash
   # View history
   git log --graph --oneline
   
   # Create backup
   git checkout -b backup/feature-cleanup feature
   ```

2. **Cleanup**
   ```bash
   # Start interactive rebase
   git rebase -i develop
   
   # Squash related commits
   # Edit commit messages
   # Drop unnecessary commits
   ```

3. **Validation**
   ```bash
   # Verify changes
   git diff develop..feature
   
   # Run tests
   npm test
   ```

### Best Practices
1. Group related changes
2. Write clear messages
3. Preserve important context
4. Document major decisions

## Pipeline Issue Resolution

### Scenario
Your pipeline fails due to:
- Linting errors
- Test failures
- Build issues
- Environment problems

### Workflow

1. **Investigation**
   ```bash
   # Get pipeline logs
   git show HEAD
   
   # Run locally
   npm run ci
   ```

2. **Fixes**
   ```bash
   # Fix linting
   npm run lint -- --fix
   
   # Fix tests
   npm test -- --watch
   
   # Fix build
   npm run build
   ```

3. **Validation**
   ```bash
   # Verify fixes
   npm run ci
   
   # Commit changes
   git commit -m "fix: resolve pipeline issues"
   ```

### Best Practices
1. Run CI locally first
2. Fix root causes
3. Add regression tests
4. Update documentation

## Code Review Management

### Scenario
Your PR has:
- Multiple review rounds
- Many change requests
- Complex discussions
- Documentation needs

### Workflow

1. **Preparation**
   ```bash
   # Update branch
   git fetch origin
   git rebase origin/develop
   
   # Run checks
   npm run ci
   ```

2. **Changes**
   ```bash
   # Address feedback
   git commit -m "fix: address review comments"
   
   # Update docs
   git commit -m "docs: update API documentation"
   ```

3. **Cleanup**
   ```bash
   # Squash review fixes
   git rebase -i develop
   
   # Force push
   git push --force-with-lease
   ```

### Best Practices
1. Address all comments
2. Group related changes
3. Keep clear history
4. Update documentation
5. Maintain communication

## Additional Resources
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)
- [Git Best Practices](https://git-scm.com/book/en/v2) 