# Handling Large Files in Git

This scenario demonstrates how to handle large files in Git using Git LFS (Large File Storage).

## Problem Statement

Your project needs to include large files (e.g., datasets, media files, machine learning models) that are:
- Larger than 100MB
- Binary files that don't benefit from Git's diffing
- Frequently updated
- Required by multiple team members

## Solution

### 1. Install Git LFS

```bash
# Windows (using Chocolatey)
choco install git-lfs

# macOS (using Homebrew)
brew install git-lfs

# Linux
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get install git-lfs
```

### 2. Initialize Git LFS

```bash
# Initialize Git LFS in your repository
git lfs install

# Track specific file patterns
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"
git lfs track "*.h5"
```

### 3. Configure .gitattributes

```gitattributes
# Track all files in data/ directory
data/** filter=lfs diff=lfs merge=lfs -text

# Track specific file types
*.psd filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text
*.h5 filter=lfs diff=lfs merge=lfs -text
```

### 4. Add and Commit Large Files

```bash
# Add large files
git add large_dataset.zip
git add data/model.h5

# Commit changes
git commit -m "feat: add large dataset and ML model"
```

### 5. Push to Remote

```bash
# Push changes including LFS objects
git push origin main
```

## Best Practices

1. **File Size Limits**
   - Use Git LFS for files > 100MB
   - Consider alternatives for files > 2GB
   - Document size limits in CONTRIBUTING.md

2. **Storage Management**
   - Monitor LFS storage usage
   - Clean up old versions if needed
   - Consider using external storage for very large files

3. **Performance**
   - Use shallow clones when possible
   - Configure LFS to download on demand
   - Cache LFS objects locally

## Common Issues

1. **Storage Quota**
   - Monitor GitHub LFS storage limits
   - Consider self-hosted LFS server for large projects
   - Implement cleanup policies

2. **Performance**
   - Large initial clone times
   - Bandwidth usage
   - Storage costs

3. **Migration**
   - Moving existing large files to LFS
   - Handling historical commits
   - Team synchronization

## Prevention

1. **Documentation**
   - List supported file types
   - Document size limits
   - Provide migration guides

2. **Automation**
   - Pre-commit hooks for file size checks
   - CI/CD pipeline validation
   - Automated cleanup scripts

3. **Monitoring**
   - Track LFS usage
   - Monitor storage costs
   - Set up alerts for limits

## Additional Resources

- [Git LFS Documentation](https://git-lfs.github.com/)
- [GitHub LFS Limits](https://docs.github.com/en/github/managing-large-files/about-git-large-file-storage)
- [LFS Migration Guide](https://github.com/git-lfs/git-lfs/wiki/Tutorial#migrating-existing-repositories-to-git-lfs) 