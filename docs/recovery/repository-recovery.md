# Repository Recovery Guide

This guide provides detailed procedures for recovering from various repository issues.

## Corrupted Repository

### Symptoms
- Git commands fail with "corrupt" or "bad" messages
- Index file is corrupted
- Objects are missing
- Repository operations are slow or fail

### Recovery Steps

1. **Initial Diagnosis**
   ```bash
   # Check repository integrity
   git fsck --full
   
   # Check for specific issues
   git fsck --lost-found
   ```

2. **Basic Recovery**
   ```bash
   # Attempt to repair
   git gc --aggressive
   
   # Clean up unnecessary files
   git prune
   ```

3. **Advanced Recovery**
   ```bash
   # Clone fresh repository
   git clone <repo-url> new-repo
   
   # Copy refs from old repository
   cp -r .git/refs/* new-repo/.git/refs/
   
   # Switch to new repository
   cd new-repo
   
   # Reset to last known good state
   git reset --hard
   ```

4. **Verify Recovery**
   ```bash
   # Check repository status
   git status
   
   # Verify remote connections
   git remote -v
   
   # Test basic operations
   git log --oneline
   ```

## Large Repository Issues

### Symptoms
- Slow Git operations
- High disk usage
- Long clone times
- Memory issues during operations

### Optimization Steps

1. **Clean Up Repository**
   ```bash
   # Remove unnecessary files
   git gc --prune=now
   
   # Clean up refs
   git remote prune origin
   ```

2. **Optimize for Size**
   ```bash
   # Create shallow clone
   git clone --depth 1 <repo-url>
   
   # Remove large files from history
   git filter-branch --tree-filter 'rm -f large-file.zip' HEAD
   ```

3. **Configure Git for Performance**
   ```bash
   # Increase buffer size
   git config --global http.postBuffer 524288000
   
   # Enable compression
   git config --global core.compression 9
   
   # Configure pack settings
   git config --global pack.windowMemory 100m
   git config --global pack.packSizeLimit 100m
   ```

## Prevention

1. **Regular Maintenance**
   - Schedule regular `git gc` operations
   - Monitor repository size
   - Clean up old branches

2. **Best Practices**
   - Use `.gitignore` effectively
   - Avoid committing large files
   - Regular backups

3. **Monitoring**
   - Track repository size
   - Monitor operation times
   - Set up alerts for issues

## Additional Resources

- [Git Maintenance Documentation](https://git-scm.com/docs/git-maintenance)
- [Git FSCK Documentation](https://git-scm.com/docs/git-fsck)
- [Git Filter Branch Documentation](https://git-scm.com/docs/git-filter-branch) 