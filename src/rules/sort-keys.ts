import type { Rule } from 'eslint'
import { defaultOrder } from '../utils/order'

const rule: Rule.RuleModule = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Sort keys in package.json',
        },
        fixable: 'code',
        schema: [],
    },
    create(context) {
        return {
            'Program > JSONExpressionStatement > JSONObjectExpression': function (node: any) {
                const filename = context.filename ?? context.getFilename()
                if (!filename.endsWith('package.json')) {
                    return
                }

                const properties = node.properties
                if (properties.length === 0) {
                    return
                }

                const sourceCode = context.sourceCode
                const sortedProperties = [...properties].sort((a, b) => {
                    const keyA = a.key.value
                    const keyB = b.key.value

                    const indexA = defaultOrder.indexOf(keyA)
                    const indexB = defaultOrder.indexOf(keyB)

                    if (indexA !== -1 && indexB !== -1) {
                        return indexA - indexB
                    }
                    if (indexA !== -1) {
                        return -1
                    }
                    if (indexB !== -1) {
                        return 1
                    }

                    return keyA.localeCompare(keyB)
                })

                // Check if order is correct
                const isSorted = properties.every(
                    (prop: any, index: number) => prop === sortedProperties[index],
                )

                if (!isSorted) {
                    context.report({
                        node,
                        message: 'Keys in package.json should be sorted.',
                        fix(fixer) {
                            // sortedProperties.map((prop: any) => {
                            //     const text = sourceCode.getText(prop)
                            //     // Preserve comments if possible?
                            //     // sourceCode.getText(node) includes the node text.
                            //     // We also need to handle the comma.
                            //     return text
                            // })

                            // Simple fix strategy:
                            // 1. Get the range from the first property start to the last property end.
                            // 2. Replace that range with the joined sorted properties.
                            // 3. We need to respect the indentation and comma style of the original file if possible.
                            // For simplicity, we assume standard indentation (2 spaces or 4 spaces) based on the file content or just 2 spaces.
                            // But a better way is to parse the separators.

                            // Let's look at the delimiters between properties in the original code.
                            // We can capture the whitespace/newlines between properties.
                            // But since we are reordering, the "between" logic changes.

                            // Robust strategy:
                            // Reconstruct the whole object body.
                            // We'll use the indentation of the first property to guess indentation.

                            const firstProp = properties[0]
                            const lastProp = properties[properties.length - 1]

                            // Detect indentation
                            const lineStart = sourceCode.getLocFromIndex(firstProp.range[0])
                            const line = sourceCode.lines[lineStart.line - 1]
                            // eslint-disable-next-line ts/ban-ts-comment
                            // @ts-expect-error
                            const indentMatch = line.slice(0, lineStart.column).match(/^\s*/)
                            const indent = indentMatch ? indentMatch[0] : '  '

                            const newText = sortedProperties
                                .map((prop: any) => sourceCode.getText(prop))
                                .join(`,\n${indent}`)

                            return fixer.replaceTextRange(
                                [firstProp.range[0], lastProp.range[1]],
                                newText,
                            )
                        },
                    })
                }
            },
        }
    },
}

export default rule
