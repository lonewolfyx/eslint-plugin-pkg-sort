import type { Rule } from 'eslint'
// @ts-expect-error - missing types
import jsoncPlugin from 'eslint-plugin-jsonc'
import { defaultOrder } from '../utils/order'

const sortKeysRule = jsoncPlugin.rules['sort-keys']

const rule: Rule.RuleModule = {
    meta: {
        ...sortKeysRule.meta,
        docs: {
            description: 'Sort keys in package.json using eslint-plugin-jsonc',
            recommended: 'error',
            url: 'https://github.com/lonewolfyx/eslint-plugin-packagejson',
        },
    },
    create(context) {
    // Instead of using a Proxy which can have issues with read-only properties,
    // we'll create a new object that inherits from the context but overrides options.
    // This is safer and more compatible.

        const contextWithOptions = Object.create(context, {
            options: {
                value: [
                    {
                        pathPattern: '^$', // Root object
                        order: [
                            ...defaultOrder,
                            { order: { type: 'asc' } },
                        ],
                    },
                ],
                writable: false,
                enumerable: true,
                configurable: true,
            },
        })

        return sortKeysRule.create(contextWithOptions)
    },
}

export default rule
