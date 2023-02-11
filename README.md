# App

# Run
  
```bash
ng serve
```


# Lint
  
```bash
nvm use 18.14.0 
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
vi .eslintrc
```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```
vi .tsconfig
```
node_modules
dist
```
vi package.json
```json
{
  "scripts": {
    ...
    "lint": "eslint . --ext .ts",
  }
}
```
