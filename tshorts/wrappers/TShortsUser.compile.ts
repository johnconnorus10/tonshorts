import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/t_shorts_user.tact',
    options: {
        debug: true,
    },
};
