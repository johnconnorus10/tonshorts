import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/t_shorts_item.tact',
    options: {
        debug: true,
    },
};
