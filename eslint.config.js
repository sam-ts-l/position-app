import antfu from '@antfu/eslint-config'

export default antfu(
    {
        // Enable stylistic formatting rules
        // stylistic: true,
        // Or customize the stylistic rules
        stylistic: {
            'indent': 4, // 4, or 'tab'
            'quotes': 'single', // or 'double'
            'semi': false,
            'linebreak-style': ['error', 'unix'],
            'brace-style': '1tbs',
            'comma-dangle': 'only-multiline',
        },
        typescript: true,
        svelte: true,
        ignores: [
            './fixtures',
            '.DS_Store',
            'node_modules',
            '/build',
            '/.svelte-kit',
            '/package',
            '.env',
            '.env.*',
            '!.env.example',
            'pnpm-lock.yaml',
            'package-lock.json',
            'yarn.lock',
            'bun.lockb',
        ],
    },
    {
        rules: {
            'curly': ['warn', 'all'],
            'style/max-statements-per-line': ['warn', { max: 2 }],
            'no-console': 'off',
        },
    },
    {
        files: ['**/*.svelte'],
        rules: {
            'svelte/html-quotes': [
                'error',
                { prefer: 'double' },
            ],
            'svelte/max-attributes-per-line': [
                'error',
                {
                    multiline: 1,
                    singleline: 1,
                },
            ],
            'svelte/first-attribute-linebreak': [
                'error',
                {
                    multiline: 'below',
                    singleline: 'beside',
                },
            ],
        },
    },
)
