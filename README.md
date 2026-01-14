# eslint-plugin-pkg

[![npm version](https://img.shields.io/npm/v/eslint-plugin-pkg.svg)](https://www.npmjs.com/package/eslint-plugin-pkg)
[![License](https://img.shields.io/npm/l/eslint-plugin-pkg.svg)](https://github.com/lonewolfyx/eslint-plugin-packagejson/blob/master/LICENSE)

An ESLint plugin to enforce a standard sorting order for your `package.json` files.

## 🌟 Features

- **Zero Configuration**: Comes with a built-in, battle-tested sorting order for standard `package.json` fields (e.g., `name`, `version`, `scripts`, `dependencies`...).
- **Auto Fixable**: Just run `eslint --fix` and watch your `package.json` organize itself.
- **Dual Engine**: Choose between a lightweight native implementation or a robust wrapper around `eslint-plugin-jsonc`.
- **Unknown Keys Handling**: Any non-standard keys are automatically sorted alphabetically at the end.

## 📦 Installation

```bash
npm install -D eslint eslint-plugin-pkg
# OR
pnpm add -D eslint eslint-plugin-pkg
# OR
yarn add -D eslint eslint-plugin-pkg
```

## 🚀 Usage

### Flat Config (ESLint v9+)

Add `eslint-plugin-pkg` to your `eslint.config.mjs`:

```javascript
import pkgPlugin from "eslint-plugin-pkg";

export default [
  // ... other configs
  
  // Option 1: Use the lightweight native implementation (Recommended)
  pkgPlugin.configs.recommended,

  // Option 2: Use the wrapper around eslint-plugin-jsonc (If you prefer the jsonc engine)
  // pkgPlugin.configs["recommended-jsonc"],
];
```

### Legacy Config (.eslintrc)

```json
{
  "extends": [
    "plugin:pkg/recommended"
  ]
}
```

## 🔧 Rules

| Rule | Description | Fixable |
| :--- | :--- | :---: |
| `pkg/sort-keys` | Enforce sorting of keys in `package.json` (Native implementation). | ✅ |
| `pkg/sort-keys-jsonc` | Enforce sorting of keys in `package.json` (Uses `eslint-plugin-jsonc` under the hood). | ✅ |

Both rules share the same default sorting order logic.

## 📝 Sorting Order

The plugin enforces a specific order for known keys, prioritizing metadata like `name` and `version` at the top, followed by scripts, dependencies, and configuration fields.

<details>
<summary>Click to view the full default order</summary>

1. name
2. displayName
3. version
4. private
5. description
6. categories
7. keywords
8. homepage
9. bugs
10. repository
11. funding
12. license
13. qna
14. author
15. maintainers
16. contributors
17. publisher
18. sideEffects
19. type
20. imports
21. exports
22. main
23. svelte
24. umd:main
25. jsdelivr
26. unpkg
27. module
28. source
29. jsnext:main
30. browser
31. react-native
32. types
33. typesVersions
34. typings
35. style
36. example
37. examplestyle
38. assets
39. bin
40. man
41. directories
42. files
43. workspaces
44. binary
45. scripts
46. betterScripts
47. contributes
48. activationEvents
49. husky
50. simple-git-hooks
51. pre-commit
52. commitlint
53. lint-staged
54. nano-staged
55. config
56. nodemonConfig
57. browserify
58. babel
59. browserslist
60. xo
61. prettier
62. eslintConfig
63. eslintIgnore
64. npmpkgjsonlint
65. npm-package-json-lint
66. release
67. remarkConfig
68. stylelint
69. ava
70. jest
71. mocha
72. nyc
73. tap
74. resolutions
75. dependencies
76. devDependencies
77. peerDependencies
78. peerDependenciesMeta
79. optionalDependencies
80. bundledDependencies
81. bundleDependencies
82. extensionPack
83. extensionDependencies
84. flat
85. engines
86. engineStrict
87. os
88. cpu
89. packageManager
90. languageName
91. publishConfig
92. icon
93. badges
94. galleryBanner
95. preview
96. markdown

</details>

Any keys not in this list will be sorted alphabetically after the known keys.

## 📄 License

MIT
