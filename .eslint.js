// eslint config.
// to get this working in vscode: https://www.39digits.com/configure-prettier-and-eslint-in-visual-studio-code/

module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha": true,
    },
    "extends": ["airbnb", "prettier"],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": ["error"]
    },
    "parser": "babel-eslint",
    "rules": {
        // indentation
        "indent": [2, 2],

        // spacing
        "template-curly-spacing": [2, "always"],
        "array-bracket-spacing": [2, "always"],
        "object-curly-spacing": [2, "always"],
        "computed-property-spacing": [2, "always"],
        "no-multiple-empty-lines": [2, { "max": 1, "maxEOF": 0, "maxBOF": 0 }],

        // brackets
        "arrow-parens": [2, "never"],

        // strings
        "quotes": [2, "single", "avoid-escape"],

        // code arrangement matter
        "no-use-before-define": [2, { "functions": false }],

        // make it meaningful
        "prefer-const": 1,

        // keep it simple
        "complexity": [1, 5],

        // react
        "react/prefer-es6-class": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-curly-spacing": [2, "always"],
        "react/jsx-indent": [2, 4],

        // semi colons - contentious
        "semi": [2, "never"],

    }
}