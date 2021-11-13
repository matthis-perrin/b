module.exports = {
  root: true,
  ignorePatterns: ["webpack.config.js"],
  env: { browser: false, node: true, es6: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json" },
  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/extensions": [".ts", ".tsx"],
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
  },
  plugins: [
    "eslint-comments",
    "import",
    "no-null",
    "prettier",
    "simple-import-sort",
    "@typescript-eslint",
    "unicorn",
    "node",
  ],
  rules: {
    "eslint-comments/disable-enable-pair": "warn",
    "eslint-comments/no-aggregating-enable": "warn",
    "eslint-comments/no-duplicate-disable": "warn",
    "eslint-comments/no-restricted-disable": "off",
    "eslint-comments/no-unlimited-disable": "warn",
    "eslint-comments/no-unused-disable": "warn",
    "eslint-comments/no-unused-enable": "off",
    "eslint-comments/no-use": [
      "warn",
      {
        allow: [
          "eslint-disable",
          "eslint-disable-line",
          "eslint-disable-next-line",
          "eslint-enable",
        ],
      },
    ],
    "eslint-comments/require-description": "off",
    "accessor-pairs": "off",
    "array-bracket-newline": "off",
    "array-bracket-spacing": "off",
    "array-callback-return": "warn",
    "array-element-newline": "off",
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "arrow-spacing": "off",
    "block-scoped-var": "off",
    "block-spacing": "off",
    "brace-style": "off",
    "callback-return": "off",
    camelcase: "off",
    "capitalized-comments": "off",
    "class-methods-use-this": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "comma-style": "off",
    complexity: "off",
    "computed-property-spacing": "off",
    "consistent-return": "off",
    "consistent-this": "off",
    "constructor-super": "warn",
    curly: "warn",
    "default-case-last": "off",
    "default-case": "warn",
    "default-param-last": "off",
    "dot-location": "off",
    "eol-last": "off",
    eqeqeq: ["warn", "always"],
    "for-direction": "off",
    "func-call-spacing": "off",
    "func-name-matching": "off",
    "func-names": "off",
    "func-style": "off",
    "function-call-argument-newline": "off",
    "function-paren-newline": "off",
    "generator-star-spacing": "off",
    "getter-return": "warn",
    "global-require": "off",
    "grouped-accessor-pairs": "off",
    "guard-for-in": "warn",
    "handle-callback-err": "off",
    "id-blacklist": "off",
    "id-denylist": "off",
    "id-length": "off",
    "id-match": "warn",
    "implicit-arrow-linebreak": "off",
    "indent-legacy": "off",
    indent: "off",
    "init-declarations": "off",
    "jsx-quotes": "off",
    "key-spacing": "off",
    "keyword-spacing": "off",
    "line-comment-position": "off",
    "linebreak-style": "off",
    "lines-around-comment": "off",
    "lines-around-directive": "off",
    "lines-between-class-members": "off",
    "max-classes-per-file": "off",
    "max-depth": "off",
    "max-len": "off",
    "max-lines-per-function": "off",
    "max-lines": "off",
    "max-nested-callbacks": "off",
    "max-params": "off",
    "max-statements-per-line": "off",
    "max-statements": "off",
    "multiline-comment-style": "off",
    "multiline-ternary": "off",
    "new-cap": "off",
    "new-parens": "off",
    "newline-after-var": "off",
    "newline-before-return": "off",
    "newline-per-chained-call": "off",
    "no-alert": "off",
    "no-array-constructor": "off",
    "no-async-promise-executor": "warn",
    "no-await-in-loop": "warn",
    "no-bitwise": "warn",
    "no-buffer-constructor": "off",
    "no-caller": "warn",
    "no-case-declarations": "warn",
    "no-catch-shadow": "off",
    "no-class-assign": "warn",
    "no-compare-neg-zero": "off",
    "no-cond-assign": "warn",
    "no-confusing-arrow": "off",
    "no-console": "warn",
    "no-const-assign": "warn",
    "no-constant-condition": "warn",
    "no-constructor-return": "warn",
    "no-continue": "off",
    "no-control-regex": "warn",
    "no-debugger": "warn",
    "no-delete-var": "warn",
    "no-div-regex": "off",
    "no-dupe-args": "warn",
    "no-dupe-class-members": "off",
    "no-dupe-else-if": "warn",
    "no-dupe-keys": "warn",
    "no-duplicate-case": "warn",
    "no-duplicate-imports": "warn",
    "no-else-return": "warn",
    "no-empty-character-class": "warn",
    "no-empty-function": "off",
    "no-empty-pattern": "warn",
    "no-empty": "warn",
    "no-eq-null": "off",
    "no-eval": "warn",
    "no-ex-assign": "warn",
    "no-extend-native": "warn",
    "no-extra-bind": "warn",
    "no-extra-boolean-cast": "warn",
    "no-extra-label": "warn",
    "no-extra-parens": "off",
    "no-extra-semi": "off",
    "no-fallthrough": "warn",
    "no-floating-decimal": "off",
    "no-func-assign": "warn",
    "no-global-assign": "warn",
    "no-implicit-coercion": ["warn", { disallowTemplateShorthand: true }],
    "no-implicit-globals": "warn",
    "no-implied-eval": "off",
    "no-import-assign": "warn",
    "no-inline-comments": "off",
    "no-inner-declarations": "off",
    "no-invalid-regexp": "warn",
    "no-invalid-this": "warn",
    "no-irregular-whitespace": "off",
    "no-iterator": "warn",
    "no-label-var": "warn",
    "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
    "no-lone-blocks": "warn",
    "no-lonely-if": "warn",
    "no-loop-func": "warn",
    "no-loss-of-precision": "warn",
    "no-magic-numbers": "off",
    "no-misleading-character-class": "warn",
    "no-mixed-operators": "off",
    "no-mixed-requires": "warn",
    "no-mixed-spaces-and-tabs": "off",
    "no-multi-assign": "warn",
    "no-multi-spaces": "off",
    "no-multi-str": "warn",
    "no-multiple-empty-lines": "off",
    "no-native-reassign": "off",
    "no-negated-condition": "off",
    "no-negated-in-lhs": "warn",
    "no-nested-ternary": "off",
    "no-new-func": "warn",
    "no-new-object": "warn",
    "no-new-require": "off",
    "no-new-symbol": "warn",
    "no-new-wrappers": "warn",
    "no-new": "warn",
    "no-nonoctal-decimal-escape": "warn",
    "no-obj-calls": "warn",
    "no-octal-escape": "warn",
    "no-octal": "warn",
    "no-param-reassign": "off",
    "no-path-concat": "off",
    "no-plusplus": "off",
    "no-process-env": "off",
    "no-process-exit": "off",
    "no-promise-executor-return": "warn",
    "no-proto": "warn",
    "no-prototype-builtins": "warn",
    "no-redeclare": "off",
    "no-regex-spaces": "warn",
    "no-restricted-exports": "off",
    "no-restricted-globals": [
      "warn",
      "addEventListener",
      "blur",
      "close",
      "closed",
      "confirm",
      "defaultStatus",
      "defaultstatus",
      "event",
      "external",
      "find",
      "focus",
      "frameElement",
      "frames",
      "history",
      "innerHeight",
      "innerWidth",
      "length",
      "location",
      "locationbar",
      "menubar",
      "moveBy",
      "moveTo",
      "name",
      "onblur",
      "onerror",
      "onfocus",
      "onload",
      "onresize",
      "onunload",
      "open",
      "opener",
      "opera",
      "outerHeight",
      "outerWidth",
      "pageXOffset",
      "pageYOffset",
      "parent",
      "print",
      "removeEventListener",
      "resizeBy",
      "resizeTo",
      "screen",
      "screenLeft",
      "screenTop",
      "screenX",
      "screenY",
      "scroll",
      "scrollbars",
      "scrollBy",
      "scrollTo",
      "scrollX",
      "scrollY",
      "self",
      "status",
      "statusbar",
      "stop",
      "toolbar",
      "top",
    ],
    "no-restricted-imports": "off",
    "no-restricted-modules": "off",
    "no-restricted-properties": "off",
    "no-restricted-syntax": "off",
    "no-return-assign": ["warn", "always"],
    "no-return-await": "warn",
    "no-script-url": "warn",
    "no-self-assign": "warn",
    "no-self-compare": "warn",
    "no-sequences": "warn",
    "no-setter-return": "warn",
    "no-shadow-restricted-names": "warn",
    "no-shadow": "off",
    "no-spaced-func": "off",
    "no-sparse-arrays": "warn",
    "no-sync": "off",
    "no-tabs": "off",
    "no-template-curly-in-string": "warn",
    "no-ternary": "off",
    "no-this-before-super": "warn",
    "no-throw-literal": "off",
    "no-trailing-spaces": "off",
    "no-undef-init": "warn",
    "no-undef": "off",
    "no-undefined": "off",
    "no-underscore-dangle": ["warn"],
    "no-unexpected-multiline": "off",
    "no-unmodified-loop-condition": "warn",
    "no-unneeded-ternary": "warn",
    "no-unreachable-loop": "warn",
    "no-unreachable": "warn",
    "no-unsafe-finally": "warn",
    "no-unsafe-negation": "off",
    "no-unsafe-optional-chaining": "off",
    "no-unused-expressions": "off",
    "no-unused-labels": "warn",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "no-useless-backreference": "off",
    "no-useless-call": "warn",
    "no-useless-catch": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-constructor": "off",
    "no-useless-escape": "warn",
    "no-useless-rename": [
      "warn",
      { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false },
    ],
    "no-useless-return": "warn",
    "no-var": "warn",
    "no-void": "warn",
    "no-warning-comments": "off",
    "no-whitespace-before-property": "off",
    "no-with": "warn",
    "nonblock-statement-body-position": "off",
    "object-curly-newline": "off",
    "object-curly-spacing": "off",
    "object-property-newline": "off",
    "object-shorthand": "warn",
    "one-var-declaration-per-line": "off",
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",
    "operator-linebreak": "off",
    "padded-blocks": "off",
    "padding-line-between-statements": "off",
    "prefer-arrow-callback": "off",
    "prefer-const": "warn",
    "prefer-destructuring": ["warn", { array: false }],
    "prefer-exponentiation-operator": "warn",
    "prefer-message-ids": "off",
    "prefer-named-capture-group": "warn",
    "prefer-numeric-literals": "off",
    "prefer-object-spread": "warn",
    "prefer-promise-reject-errors": "warn",
    "prefer-reflect": "off",
    "prefer-regex-literals": ["warn", { disallowRedundantWrapping: true }],
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    "prefer-template": "warn",
    "quote-props": "off",
    quotes: "off",
    radix: "warn",
    "require-atomic-updates": "warn",
    "require-await": "off",
    "require-jsdoc": "off",
    "require-meta-docs-url": "off",
    "require-unicode-regexp": "warn",
    "require-yield": "warn",
    "rest-spread-spacing": "off",
    "semi-spacing": "off",
    "semi-style": "off",
    semi: "off",
    "sort-imports": "off",
    "sort-keys": "off",
    "sort-vars": "off",
    "space-before-blocks": "off",
    "space-before-function-paren": "off",
    "space-in-parens": "off",
    "space-infix-ops": "off",
    "space-unary-ops": "off",
    "spaced-comment": "off",
    strict: ["warn", "never"],
    "switch-colon-spacing": "off",
    "symbol-description": "off",
    "template-curly-spacing": "off",
    "template-tag-spacing": "off",
    "unicode-bom": "off",
    "use-isnan": "warn",
    "valid-jsdoc": "off",
    "valid-typeof": "warn",
    "vars-on-top": "off",
    "wrap-iife": "off",
    "wrap-regex": "off",
    "yield-star-spacing": "off",
    yoda: "warn",
    "import/default": "warn",
    "import/dynamic-import-chunkname": "warn",
    "import/export": "warn",
    "import/exports-last": "off",
    "import/extensions": "off",
    "import/first": "warn",
    "import/group-exports": "off",
    "import/max-dependencies": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/newline-after-import": "off",
    "import/no-absolute-path": "off",
    "import/no-amd": "warn",
    "import/no-anonymous-default-export": "warn",
    "import/no-commonjs": "off",
    "import/no-cycle": "off",
    "import/no-default-export": "warn",
    "import/no-deprecated": "warn",
    "import/no-duplicates": "off",
    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-internal-modules": "off",
    "import/no-import-module-exports": "warn",
    "import/no-mutable-exports": "warn",
    "import/no-named-as-default-member": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-default": "warn",
    "import/no-named-export": "off",
    "import/no-namespace": "warn",
    "import/no-nodejs-modules": "off",
    "import/no-relative-packages": "warn",
    "import/no-relative-parent-imports": "off",
    "import/no-restricted-paths": "off",
    "import/no-self-import": "warn",
    "import/no-unassigned-import": "warn",
    "import/no-unresolved": "warn",
    "import/no-unused-modules": "off",
    "import/no-useless-path-segments": "warn",
    "import/no-webpack-loader-syntax": "warn",
    "import/order": "off",
    "import/prefer-default-export": "off",
    "import/unambiguous": "off",
    "no-null/no-null": "warn",
    "prettier/prettier": "warn",
    "simple-import-sort/imports": ["warn"],
    "simple-import-sort/exports": "off",
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/await-thenable": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-tslint-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/brace-style": "off",
    "@typescript-eslint/class-literal-property-style": ["warn", "fields"],
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/comma-spacing": "off",
    "@typescript-eslint/consistent-indexed-object-style": "warn",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/consistent-type-definitions": "warn",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/default-param-last": "warn",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      { allowExpressions: true },
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      { accessibility: "explicit" },
    ],
    "@typescript-eslint/explicit-module-boundary-types": [
      "warn",
      {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/func-call-spacing": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/init-declarations": "off",
    "@typescript-eslint/keyword-spacing": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "variable",
        format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
      },
      {
        selector: "property",
        format: null,
        custom: {
          regex: "^([a-zA-Z]([a-z]+)?((\\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?)$",
          match: true,
        },
      },
      {
        selector: [
          "function",
          "parameter",
          "parameterProperty",
          "method",
          "accessor",
        ],
        format: ["strictCamelCase"],
      },
      {
        selector: [
          "enumMember",
          "class",
          "interface",
          "typeAlias",
          "enum",
          "typeParameter",
        ],
        format: ["StrictPascalCase"],
      },
    ],
    "@typescript-eslint/no-array-constructor": "warn",
    "@typescript-eslint/no-base-to-string": "warn",
    "@typescript-eslint/no-confusing-non-null-assertion": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-dupe-class-members": "warn",
    "@typescript-eslint/no-duplicate-imports": [
      "warn",
      { includeExports: true },
    ],
    "@typescript-eslint/no-dynamic-delete": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "warn",
    "@typescript-eslint/no-extra-parens": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-extraneous-class": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-for-in-array": "warn",
    "@typescript-eslint/no-implicit-any-catch": "warn",
    "@typescript-eslint/no-implied-eval": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-invalid-this": "warn",
    "@typescript-eslint/no-invalid-void-type": "warn",
    "@typescript-eslint/no-loop-func": "warn",
    "@typescript-eslint/no-loss-of-precision": "warn",
    "@typescript-eslint/no-magic-numbers": [
      "warn",
      {
        ignore: [-1, 0, 1, 2, 10, 60, 100, 1000, 1024, 3600],
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreEnums: true,
      },
    ],
    "@typescript-eslint/no-meaningless-void-operator": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-misused-promises": [
      "warn",
      { checksVoidReturn: true, checksConditionals: true, ignoreRhs: true },
    ],
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-redeclare": "warn",
    "@typescript-eslint/no-require-imports": "warn",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-throw-literal": "warn",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": [
      "warn",
      {
        allowComparingNullableBooleansToTrue: false,
        allowComparingNullableBooleansToFalse: true,
      },
    ],
    "@typescript-eslint/no-unnecessary-condition": [
      "warn",
      { allowConstantLoopConditions: true },
    ],
    "@typescript-eslint/no-unnecessary-qualifier": "warn",
    "@typescript-eslint/no-unnecessary-type-arguments": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-unused-vars-experimental": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        caughtErrors: "all",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "warn",
      { functions: false, variables: false },
    ],
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "@typescript-eslint/object-curly-spacing": "off",
    "@typescript-eslint/prefer-as-const": "warn",
    "@typescript-eslint/prefer-enum-initializers": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/prefer-literal-enum-member": [
      "warn",
      { allowBitwiseExpressions: true },
    ],
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-readonly-parameter-types": "off",
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",
    "@typescript-eslint/prefer-return-this-type": "warn",
    "@typescript-eslint/prefer-regexp-exec": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "@typescript-eslint/promise-function-async": "warn",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/require-array-sort-compare": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/return-await": ["warn", "never"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/space-infix-ops": "off",
    "@typescript-eslint/sort-type-union-intersection-members": "off",
    "@typescript-eslint/strict-boolean-expressions": [
      "warn",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "@typescript-eslint/triple-slash-reference": "warn",
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/unified-signatures": "warn",
    "unicorn/better-regex": "warn",
    "unicorn/catch-error-name": ["warn", { name: "err" }],
    "unicorn/consistent-destructuring": "warn",
    "unicorn/consistent-function-scoping": "warn",
    "unicorn/custom-error-definition": "warn",
    "unicorn/empty-brace-spaces": "off",
    "unicorn/error-message": "warn",
    "unicorn/escape-case": "warn",
    "unicorn/expiring-todo-comments": "off",
    "unicorn/explicit-length-check": "off",
    "unicorn/filename-case": ["warn", { cases: { snakeCase: true } }],
    "unicorn/import-index": "off",
    "unicorn/import-style": "off",
    "unicorn/new-for-builtins": "off",
    "unicorn/no-abusive-eslint-disable": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "warn",
    "unicorn/no-array-method-this-argument": "warn",
    "unicorn/no-array-push-push": "warn",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-console-spaces": "off",
    "unicorn/no-document-cookie": "warn",
    "unicorn/no-for-loop": "warn",
    "unicorn/no-hex-escape": "warn",
    "unicorn/no-instanceof-array": "warn",
    "unicorn/no-invalid-remove-event-listener": "warn",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-lonely-if": "warn",
    "unicorn/no-nested-ternary": "off",
    "unicorn/no-new-array": "off",
    "unicorn/no-new-buffer": "off",
    "unicorn/no-null": "off",
    "unicorn/no-object-as-default-parameter": "warn",
    "unicorn/no-process-exit": "off",
    "unicorn/no-static-only-class": "warn",
    "unicorn/no-this-assignment": "warn",
    "unicorn/no-unreadable-array-destructuring": "warn",
    "unicorn/no-unsafe-regex": "warn",
    "unicorn/no-unused-properties": "off",
    "unicorn/no-useless-fallback-in-spread": "warn",
    "unicorn/no-useless-undefined": "off",
    "unicorn/no-zero-fractions": "warn",
    "unicorn/number-literal-case": "off",
    "unicorn/numeric-separators-style": "off",
    "unicorn/prefer-add-event-listener": "off",
    "unicorn/prefer-array-find": "warn",
    "unicorn/prefer-array-flat-map": "warn",
    "unicorn/prefer-array-index-of": "warn",
    "unicorn/prefer-at": "warn",
    "unicorn/prefer-date-now": "warn",
    "unicorn/prefer-dom-node-append": "off",
    "unicorn/prefer-dom-node-dataset": "off",
    "unicorn/prefer-dom-node-remove": "off",
    "unicorn/prefer-dom-node-text-content": "off",
    "unicorn/prefer-includes": "warn",
    "unicorn/prefer-keyboard-event-key": "warn",
    "unicorn/prefer-math-trunc": "warn",
    "unicorn/prefer-modern-dom-apis": "off",
    "unicorn/prefer-module": "warn",
    "unicorn/prefer-negative-index": "warn",
    "unicorn/prefer-node-protocol": "off",
    "unicorn/prefer-number-properties": "off",
    "unicorn/prefer-object-has-own": "warn",
    "unicorn/prefer-optional-catch-binding": "off",
    "unicorn/prefer-prototype-methods": "warn",
    "unicorn/prefer-query-selector": "off",
    "unicorn/prefer-reflect-apply": "off",
    "unicorn/prefer-regexp-test": "warn",
    "unicorn/prefer-set-has": "warn",
    "unicorn/prefer-spread": "warn",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/prefer-string-slice": "warn",
    "unicorn/prefer-string-starts-ends-with": "warn",
    "unicorn/prefer-string-trim-start-end": "warn",
    "unicorn/prefer-ternary": "warn",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/prefer-type-error": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/require-array-join-separator": "warn",
    "unicorn/require-number-to-fixed-digits-argument": "warn",
    "unicorn/require-post-message-target-origin": "warn",
    "unicorn/string-content": "off",
    "unicorn/switch": "off",
    "unicorn/throw-new-error": "warn",
    "unicorn/prefer-array-flat": "warn",
    "node/callback-return": ["warn", ["callback", "cb", "next", "done"]],
    "node/exports-style": "off",
    "node/file-extension-in-import": ["warn", "never"],
    "node/global-require": "warn",
    "node/handle-callback-err": "warn",
    "node/no-callback-literal": "off",
    "node/no-deprecated-api": "warn",
    "node/no-exports-assign": "warn",
    "node/no-missing-import": "off",
    "node/no-missing-require": "off",
    "node/no-mixed-requires": "warn",
    "node/no-new-require": "warn",
    "node/no-path-concat": "warn",
    "node/no-process-env": "warn",
    "node/no-process-exit": "warn",
    "node/no-restricted-import": "off",
    "node/no-restricted-require": "off",
    "node/no-sync": "warn",
    "node/no-unpublished-bin": "off",
    "node/no-unpublished-import": "off",
    "node/no-unpublished-require": "off",
    "node/no-unsupported-features/es-builtins": ["warn", { version: ">=14" }],
    "node/no-unsupported-features/es-syntax": [
      "warn",
      { version: ">=14", ignores: ["modules"] },
    ],
    "node/no-unsupported-features/node-builtins": ["warn", { version: ">=14" }],
    "node/prefer-global/buffer": ["warn", "always"],
    "node/prefer-global/console": ["warn", "always"],
    "node/prefer-global/process": ["warn", "always"],
    "node/prefer-global/text-decoder": ["warn", "always"],
    "node/prefer-global/text-encoder": "off",
    "node/prefer-global/url-search-params": ["warn", "always"],
    "node/prefer-global/url": "off",
    "node/prefer-promises/dns": "warn",
    "node/prefer-promises/fs": "warn",
    "node/process-exit-as-throw": "warn",
    "node/shebang": "off",
  },
};

