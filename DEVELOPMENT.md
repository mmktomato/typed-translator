# Test

## root directory

```bash
# Run unit test.
$ npm run test

# Run command using example's resources.
$ npm run cmd:example
$ cat result/example-node-simple.d.ts
```

## examples directory

```bash
# Run example app
$ npm run start
```

# Refresh the library in example directory

```bash
$ npm install --save ../../
```

# Publish new version

+ git switch master
+ npm version [major|minor|patch]
+ git diff HEAD^
+ git tag | tail -n 1
+ npm run build
+ git push
+ git push origin [tag name]
+ npm login
+ npm publish --dry-run
+ npm publish
+ npm logout
