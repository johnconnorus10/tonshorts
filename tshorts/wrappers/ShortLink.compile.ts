import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/short_link.tact',
    options: {
        debug: true,
    },
};
