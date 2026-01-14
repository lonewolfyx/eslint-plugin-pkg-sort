import { RuleTester } from 'eslint'
import * as parser from 'jsonc-eslint-parser'
import { describe, it } from 'vitest'
import rule from '../../src/rules/sort-keys-jsonc'

// Adapt RuleTester for Vitest
RuleTester.describe = describe
RuleTester.it = it

const tester = new RuleTester({
    languageOptions: {
        parser,
    },
})

tester.run('sort-keys-jsonc', rule, {
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
            // jsonc plugin error message is slightly different: "Expected object keys to be in specified order. 'version' should be after 'name'."
            errors: [{ message: 'Expected object keys to be in specified order. \'version\' should be after \'name\'.' }],
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
            // jsonc plugin seems to report only one error at a time or merges them differently
            // The error received was: "Expected object keys to be in specified order. 'scripts' should be after 'version'."
            errors: [
                { message: 'Expected object keys to be in specified order. \'scripts\' should be after \'version\'.' },
            ],
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
            errors: [{ message: 'Expected object keys to be in specified order. \'zoo\' should be after \'apple\'.' }],
        },
    ],
})
