# Git Troubleshooting Guide

This guide provides solutions for common Git issues and problems that developers might encounter.

## Table of Contents
1. [Repository Issues](#repository-issues)
2. [Branch Issues](#branch-issues)
3. [Commit Issues](#commit-issues)
4. [Merge Issues](#merge-issues)
5. [Remote Issues](#remote-issues)
6. [Pipeline Issues](#pipeline-issues)
7. [Git Hook Issues](#git-hook-issues)

## Repository Issues

### Corrupted Repository
**Symptoms:**
- Git commands fail with "corrupt" or "bad" messages
- Index file is corrupted
- Objects are missing

**Solution:**
```bash
# Check repository
git fsck --full

# Try to repair
git gc --aggressive

# If still corrupted
git clone <repo-url> new-repo
cp -r .git/refs/* new-repo/.git/refs/
cd new-repo
git reset --hard
```

### Large Repository
**Symptoms:**
- Slow Git operations
- High disk usage
- Long clone times

**Solution:**
```bash
# Clean unnecessary files
git gc
git prune

# Shallow clone
git clone --depth 1 <repo-url>

# Remove large files from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
```

## Branch Issues

### Lost Branch
**Symptoms:**
- Branch disappeared
- Can't find commits
- Accidental deletion

**Solution:**
```bash
# Find lost commits
git reflog

# Recover branch
git checkout -b recovered-branch <commit-hash>

# If branch was remote
git fetch origin
git checkout -b branch origin/branch
```

### Outdated Branch
**Symptoms:**
- Many commits behind main
- Conflicts when merging
- Divergent history

**Solution:**
```bash
# Update from remote
git fetch origin

# Rebase on main
git rebase origin/main

# If conflicts occur
git rebase --abort
git merge origin/main
```

## Commit Issues

### Wrong Commit Message
**Symptoms:**
- Typo in message
- Wrong issue reference
- Incorrect description

**Solution:**
```bash
# Change last commit message
git commit --amend -m "New message"

# Change older commit message
git rebase -i HEAD~3
# Change 'pick' to 'reword' for target commit
```

### Accidentally Committed Sensitive Data
**Symptoms:**
- API keys in code
- Passwords in config
- Private data exposed

**Solution:**
```bash
# Remove file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config.json" \
  --prune-empty --tag-name-filter cat -- --all

# Add to .gitignore
echo "config.json" >> .gitignore

# Force push changes
git push origin --force --all
```

## Merge Issues

### Merge Conflicts
**Symptoms:**
- Auto-merge failed
- Conflict markers in files
- Git status shows conflicts

**Solution:**
```bash
# Abort current merge
git merge --abort

# Start fresh
git fetch origin
git checkout feature-branch
git rebase origin/main

# If still conflicted
git status  # Check conflicted files
# Edit files manually
git add resolved-file.js
git rebase --continue
```

### Merge Wrong Branch
**Symptoms:**
- Wrong changes in branch
- Unexpected code appears
- History is incorrect

**Solution:**
```bash
# If not pushed
git reset --hard HEAD~1

# If pushed
git revert HEAD
git push origin

# To merge correct branch
git checkout correct-branch
git merge target-branch
```

## Remote Issues

### Push Rejected
**Symptoms:**
- Push fails
- Remote has changes
- History diverged

**Solution:**
```bash
# Update local branch
git fetch origin
git rebase origin/main

# If force push is safe
git push --force-with-lease

# Alternative: merge approach
git pull origin main
git push origin
```

### Remote Not Found
**Symptoms:**
- Remote commands fail
- Can't fetch/push
- Remote not configured

**Solution:**
```bash
# List remotes
git remote -v

# Add missing remote
git remote add origin <repo-url>

# Update remote URL
git remote set-url origin <new-url>
```

## Pipeline Issues

### Failed Checks
**Symptoms:**
- CI/CD pipeline fails
- Tests fail
- Linting errors

**Solution:**
```bash
# Run checks locally
npm run lint
npm test

# Fix and stage changes
git add .
git commit --amend --no-edit

# Force push if needed
git push --force-with-lease
```

### Environment Issues
**Symptoms:**
- Works locally
- Fails in CI
- Environment differences

**Solution:**
```bash
# Check environment files
git check-ignore .env*

# Review CI configuration
cat .github/workflows/ci.yml

# Test in Docker
docker build -t test-env .
docker run test-env npm test
```

## Git Hook Issues

### Pre-commit Hook Fails
**Symptoms:**
- Can't commit changes
- Hook script errors
- Permission issues

**Solution:**
```bash
# Skip hooks temporarily
git commit --no-verify

# Fix hook permissions
chmod +x .git/hooks/pre-commit

# Debug hook
bash -x .git/hooks/pre-commit
```

### Hook Not Running
**Symptoms:**
- Hooks not executing
- No hook output
- Missing hook files

**Solution:**
```bash
# Check hook location
ls -la .git/hooks/

# Install hooks
git config core.hooksPath .git-hooks

# Make hooks executable
chmod +x .git-hooks/*
```

## Best Practices for Prevention

1. **Regular Maintenance**
   - Keep repository clean
   - Regular backups
   - Periodic health checks

2. **Good Habits**
   - Frequent small commits
   - Clear commit messages
   - Regular updates from main

3. **Team Communication**
   - Document issues
   - Share solutions
   - Update guidelines

4. **Tools and Automation**
   - Use Git hooks
   - Automated testing
   - Code quality tools

## Additional Resources
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Stack Overflow Git Tag](https://stackoverflow.com/questions/tagged/git)
- [Pro Git Book](https://git-scm.com/book/en/v2) 