# Handling Merge Conflicts in Outdated Branches

This scenario demonstrates how to handle situations where a feature branch has become outdated and has merge conflicts when trying to merge with the main branch.

## Problem Description

You have a feature branch `feature/payment-integration` that was created from `develop` two weeks ago. Since then:
- The `develop` branch has had multiple commits
- Your feature branch has been worked on independently
- The changes in `develop` affect the same files you've modified
- Your branch is now several commits behind

When you try to merge your branch:
```bash
git checkout develop
git pull origin develop
git checkout feature/payment-integration
git merge develop
```

You get merge conflicts in multiple files:
```
CONFLICT (content): src/payment/processor.js
CONFLICT (content): src/payment/validation.js
CONFLICT (content): tests/payment.test.js
```

## Solution Steps

### 1. Backup Your Branch
```bash
git checkout feature/payment-integration
git checkout -b feature/payment-integration-backup
```

### 2. Update Your Branch
```bash
git checkout feature/payment-integration
git fetch origin
git rebase origin/develop
```

### 3. Resolve Conflicts
For each conflicted file:
1. Open the file
2. Look for conflict markers:
   ```
   <<<<<<< HEAD
   Current changes from develop
   =======
   Your changes
   >>>>>>> feature/payment-integration
   ```
3. Choose the correct changes or combine them
4. Remove conflict markers
5. Stage the resolved file:
   ```bash
   git add src/payment/processor.js
   ```

### 4. Continue Rebase
```bash
git rebase --continue
```

### 5. Push Changes
```bash
git push origin feature/payment-integration --force-with-lease
```

## Alternative Approaches

### 1. Merge Instead of Rebase
```bash
git checkout feature/payment-integration
git merge develop
# Resolve conflicts
git commit -m "merge: resolve conflicts with develop"
```

### 2. Cherry-pick Changes
```bash
git checkout feature/payment-integration
git cherry-pick develop..feature/payment-integration
```

## Best Practices

### 1. Keep Branches Updated
- Regularly pull from develop
- Rebase frequently
- Address conflicts early

### 2. Conflict Resolution
- Understand both changes
- Test after resolution
- Document complex decisions
- Get team review for major conflicts

### 3. Communication
- Notify team of major conflicts
- Document resolution approach
- Update related documentation

## Common Pitfalls

### 1. Lost Changes
- Always create backup branches
- Document important decisions
- Review changes carefully

### 2. Incorrect Resolution
- Test thoroughly after resolution
- Get code review for complex conflicts
- Verify functionality

### 3. Force Push Issues
- Use `--force-with-lease` instead of `--force`
- Communicate with team members
- Coordinate pushes

## Tools and Commands

```bash
# View conflicts
git status
git diff

# Abort rebase/merge
git rebase --abort
git merge --abort

# View commit history
git log --graph --oneline --all

# Clean working directory
git reset --hard HEAD
git clean -fd

# Stash changes
git stash
git stash pop
```

## Additional Resources
- [Git Merge Documentation](https://git-scm.com/docs/git-merge)
- [Git Rebase Guide](https://git-scm.com/docs/git-rebase)
- [Resolving Merge Conflicts](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts) 