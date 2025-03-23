# Complex Branch History Scenario

This scenario demonstrates a common Git problem where a feature branch has become difficult to review due to multiple commits, fixes, and changes that make the history unclear.

## Problem Description

You have a feature branch `feature/user-authentication` that has been worked on for several weeks. The branch has:
- 50+ commits
- Multiple merge commits from develop
- Various fix commits
- Commits that change the same files multiple times
- Commits that mix different concerns

The branch history looks something like this:
```
*   Merge develop into feature/user-authentication
|\
| *  fix: resolve linting issues
| *  fix: update test cases
| *  feat: add new test scenarios
* |  fix: resolve merge conflicts
* |  fix: update documentation
* |  feat: implement user validation
* |  fix: correct typo in error message
* |  feat: add login form
* |  fix: resolve build errors
* |  feat: initial commit
```

## Solution Steps

### 1. Create a Backup Branch
```bash
git checkout feature/user-authentication
git checkout -b feature/user-authentication-backup
```

### 2. Interactive Rebase
```bash
git checkout feature/user-authentication
git rebase -i develop
```

### 3. Squash Related Commits
In the interactive rebase editor:
```
pick abc1234 feat: initial commit
squash def5678 fix: resolve build errors
squash ghi9012 feat: add login form
squash jkl3456 fix: correct typo in error message
pick mno7890 feat: implement user validation
squash pqr2345 fix: update documentation
squash stu6789 fix: resolve merge conflicts
pick vwx0123 feat: add new test scenarios
squash yza4567 fix: update test cases
squash bcd8901 fix: resolve linting issues
```

### 4. Force Push (if necessary)
```bash
git push origin feature/user-authentication --force-with-lease
```

## Best Practices to Prevent This

1. **Regular Rebase**
   - Keep feature branch up-to-date with develop
   - Rebase frequently to avoid large merges

2. **Atomic Commits**
   - One logical change per commit
   - Keep commits focused and small

3. **Feature Branch Lifecycle**
   - Keep feature branches short-lived
   - Regular cleanup of completed features

4. **Code Review Process**
   - Review commits as they're made
   - Address issues early
   - Regular team sync on branch status

## Common Pitfalls

1. **Losing History**
   - Always create backup branches
   - Document important decisions

2. **Merge Conflicts**
   - Resolve conflicts carefully
   - Test after conflict resolution

3. **Force Push Issues**
   - Use `--force-with-lease` instead of `--force`
   - Communicate with team members

## Tools and Commands

```bash
# View branch history
git log --graph --oneline --all

# Interactive rebase
git rebase -i develop

# Create backup
git branch backup-branch

# Force push safely
git push --force-with-lease origin branch-name

# Clean up merged branches
git branch --merged | grep -v "\*" | xargs -n 1 git branch -d
```

## Additional Resources
- [Git Rebase Documentation](https://git-scm.com/docs/git-rebase)
- [Interactive Rebase Guide](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [Force Push Best Practices](https://git-scm.com/docs/git-push#Documentation/git-push.txt--f) 