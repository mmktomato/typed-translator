# Test

## root directory

```bash
# Run unit test.
$ npm run test

# Run command using example's resources.
$ npm run cmd:example
$ cat result/example.d.ts
```

## example directory

```bash
# Run example app
$ npm run start
```

# Refresh the library in example directory

```bash
$ npm install --save ../
```

# Publish new version

+ Bump version in package.json and package-lock.json.
+ npm run build
+ git commit
+ git tag <version>
+ git push
+ git push origin <tag name>
+ npm login
+ npm publish --dry-run
+ npm publish
+ npm logout
