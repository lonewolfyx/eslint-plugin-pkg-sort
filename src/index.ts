import * as jsoncParser from 'jsonc-eslint-parser'
import sortKeys from './rules/sort-keys'
import sortKeysJsonc from './rules/sort-keys-jsonc'

const plugin = {
    meta: {
        name: 'eslint-plugin-pkg',
        version: '0.0.1',
    },
    rules: {
        'sort-keys': sortKeys,
        'sort-keys-jsonc': sortKeysJsonc,
    },
    configs: {} as any,
}

// Define the recommended config (using native implementation by default)
Object.assign(plugin.configs, {
    'recommended': {
        plugins: {
            pkg: plugin,
        },
        rules: {
            'pkg/sort-keys': 'error',
        },
        files: ['package.json'],
        languageOptions: {
            parser: jsoncParser,
        },
    },
    // Add a new config that uses the jsonc wrapper
    'recommended-jsonc': {
        plugins: {
            pkg: plugin,
        },
        rules: {
            'pkg/sort-keys-jsonc': 'error',
        },
        files: ['package.json'],
        languageOptions: {
            parser: jsoncParser,
        },
    },
})

export default plugin
