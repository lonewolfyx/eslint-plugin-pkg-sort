import { RuleTester } from 'eslint'
import * as parser from 'jsonc-eslint-parser'
import { describe, it } from 'vitest'
import rule from '../../src/rules/sort-keys'

// Adapt RuleTester for Vitest
RuleTester.describe = describe
RuleTester.it = it

const tester = new RuleTester({
    languageOptions: {
        parser,
    },
})

tester.run('sort-keys', rule, {
    valid: [
        {
            filename: 'package.json',
            code: `{
  "name": "foo",
  "version": "1.0.0",
  "description": "bar",
  "scripts": {},
  "dependencies": {},
  "devDependencies": {}
}`,
        },
        {
            filename: 'package.json',
            code: `{
  "name": "foo",
  "version": "1.0.0",
  "private": true
}`,
        },
    ],
    invalid: [
        {
            filename: 'package.json',
            code: `{
  "version": "1.0.0",
  "name": "foo"
}`,
            output: `{
  "name": "foo",
  "version": "1.0.0"
}`,
            errors: [{ message: 'Keys in package.json should be sorted.' }],
        },
        {
            filename: 'package.json',
            code: `{
  "scripts": {},
  "name": "foo",
  "version": "1.0.0"
}`,
            output: `{
  "name": "foo",
  "version": "1.0.0",
  "scripts": {}
}`,
            errors: [{ message: 'Keys in package.json should be sorted.' }],
        },
        // Test alphabetical order for unknown keys
        {
            filename: 'package.json',
            code: `{
  "name": "foo",
  "zoo": "bar",
  "apple": "pie"
}`,
            output: `{
  "name": "foo",
  "apple": "pie",
  "zoo": "bar"
}`,
            errors: [{ message: 'Keys in package.json should be sorted.' }],
        },
    ],
})
