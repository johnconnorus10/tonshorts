import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type NewVideo = {
    $$type: 'NewVideo';
    content: string;
}

export function storeNewVideo(src: NewVideo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3237407972, 32);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadNewVideo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3237407972) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadStringRefTail();
    return { $$type: 'NewVideo' as const, content: _content };
}

function loadTupleNewVideo(source: TupleReader) {
    let _content = source.readString();
    return { $$type: 'NewVideo' as const, content: _content };
}

function storeTupleNewVideo(source: NewVideo) {
    let builder = new TupleBuilder();
    builder.writeString(source.content);
    return builder.build();
}

function dictValueParserNewVideo(): DictionaryValue<NewVideo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewVideo(src)).endCell());
        },
        parse: (src) => {
            return loadNewVideo(src.loadRef().beginParse());
        }
    }
}

export type UpdateVideo = {
    $$type: 'UpdateVideo';
    seqno: bigint;
    content: string;
}

export function storeUpdateVideo(src: UpdateVideo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1685543179, 32);
        b_0.storeUint(src.seqno, 256);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadUpdateVideo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1685543179) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    let _content = sc_0.loadStringRefTail();
    return { $$type: 'UpdateVideo' as const, seqno: _seqno, content: _content };
}

function loadTupleUpdateVideo(source: TupleReader) {
    let _seqno = source.readBigNumber();
    let _content = source.readString();
    return { $$type: 'UpdateVideo' as const, seqno: _seqno, content: _content };
}

function storeTupleUpdateVideo(source: UpdateVideo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    builder.writeString(source.content);
    return builder.build();
}

function dictValueParserUpdateVideo(): DictionaryValue<UpdateVideo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateVideo(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateVideo(src.loadRef().beginParse());
        }
    }
}

export type InternalSetContent = {
    $$type: 'InternalSetContent';
    content: string;
}

export function storeInternalSetContent(src: InternalSetContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3961223985, 32);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadInternalSetContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3961223985) { throw Error('Invalid prefix'); }
    let _content = sc_0.loadStringRefTail();
    return { $$type: 'InternalSetContent' as const, content: _content };
}

function loadTupleInternalSetContent(source: TupleReader) {
    let _content = source.readString();
    return { $$type: 'InternalSetContent' as const, content: _content };
}

function storeTupleInternalSetContent(source: InternalSetContent) {
    let builder = new TupleBuilder();
    builder.writeString(source.content);
    return builder.build();
}

function dictValueParserInternalSetContent(): DictionaryValue<InternalSetContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalSetContent(src)).endCell());
        },
        parse: (src) => {
            return loadInternalSetContent(src.loadRef().beginParse());
        }
    }
}

export type CompleteVideo = {
    $$type: 'CompleteVideo';
    seqno: bigint;
}

export function storeCompleteVideo(src: CompleteVideo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3075533923, 32);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadCompleteVideo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3075533923) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'CompleteVideo' as const, seqno: _seqno };
}

function loadTupleCompleteVideo(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'CompleteVideo' as const, seqno: _seqno };
}

function storeTupleCompleteVideo(source: CompleteVideo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserCompleteVideo(): DictionaryValue<CompleteVideo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompleteVideo(src)).endCell());
        },
        parse: (src) => {
            return loadCompleteVideo(src.loadRef().beginParse());
        }
    }
}

export type InternalComplete = {
    $$type: 'InternalComplete';
    excess: Address;
}

export function storeInternalComplete(src: InternalComplete) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3472919628, 32);
        b_0.storeAddress(src.excess);
    };
}

export function loadInternalComplete(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3472919628) { throw Error('Invalid prefix'); }
    let _excess = sc_0.loadAddress();
    return { $$type: 'InternalComplete' as const, excess: _excess };
}

function loadTupleInternalComplete(source: TupleReader) {
    let _excess = source.readAddress();
    return { $$type: 'InternalComplete' as const, excess: _excess };
}

function storeTupleInternalComplete(source: InternalComplete) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.excess);
    return builder.build();
}

function dictValueParserInternalComplete(): DictionaryValue<InternalComplete> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalComplete(src)).endCell());
        },
        parse: (src) => {
            return loadInternalComplete(src.loadRef().beginParse());
        }
    }
}

export type NewVideoResponse = {
    $$type: 'NewVideoResponse';
    seqno: bigint;
}

export function storeNewVideoResponse(src: NewVideoResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(8580272, 32);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadNewVideoResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 8580272) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'NewVideoResponse' as const, seqno: _seqno };
}

function loadTupleNewVideoResponse(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'NewVideoResponse' as const, seqno: _seqno };
}

function storeTupleNewVideoResponse(source: NewVideoResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserNewVideoResponse(): DictionaryValue<NewVideoResponse> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewVideoResponse(src)).endCell());
        },
        parse: (src) => {
            return loadNewVideoResponse(src.loadRef().beginParse());
        }
    }
}

export type UpdateVideoResponse = {
    $$type: 'UpdateVideoResponse';
    seqno: bigint;
}

export function storeUpdateVideoResponse(src: UpdateVideoResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3417007650, 32);
        b_0.storeUint(src.seqno, 256);
    };
}

export function loadUpdateVideoResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3417007650) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(256);
    return { $$type: 'UpdateVideoResponse' as const, seqno: _seqno };
}

function loadTupleUpdateVideoResponse(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'UpdateVideoResponse' as const, seqno: _seqno };
}

function storeTupleUpdateVideoResponse(source: UpdateVideoResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserUpdateVideoResponse(): DictionaryValue<UpdateVideoResponse> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateVideoResponse(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateVideoResponse(src.loadRef().beginParse());
        }
    }
}

export type InternalAdd = {
    $$type: 'InternalAdd';
    amount: bigint;
    origin: Address;
}

export function storeInternalAdd(src: InternalAdd) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(306259763, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.origin);
    };
}

export function loadInternalAdd(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 306259763) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _origin = sc_0.loadAddress();
    return { $$type: 'InternalAdd' as const, amount: _amount, origin: _origin };
}

function loadTupleInternalAdd(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _origin = source.readAddress();
    return { $$type: 'InternalAdd' as const, amount: _amount, origin: _origin };
}

function storeTupleInternalAdd(source: InternalAdd) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.origin);
    return builder.build();
}

function dictValueParserInternalAdd(): DictionaryValue<InternalAdd> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalAdd(src)).endCell());
        },
        parse: (src) => {
            return loadInternalAdd(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    amount: bigint;
    to: Address;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1943715420, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.to);
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1943715420) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _to = sc_0.loadAddress();
    return { $$type: 'Transfer' as const, amount: _amount, to: _to };
}

function loadTupleTransfer(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    return { $$type: 'Transfer' as const, amount: _amount, to: _to };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type CreateCom = {
    $$type: 'CreateCom';
    queryId: bigint;
    amount: bigint;
}

export function storeCreateCom(src: CreateCom) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3610565249, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadCreateCom(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3610565249) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'CreateCom' as const, queryId: _queryId, amount: _amount };
}

function loadTupleCreateCom(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'CreateCom' as const, queryId: _queryId, amount: _amount };
}

function storeTupleCreateCom(source: CreateCom) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCreateCom(): DictionaryValue<CreateCom> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateCom(src)).endCell());
        },
        parse: (src) => {
            return loadCreateCom(src.loadRef().beginParse());
        }
    }
}

export type CreateComItem = {
    $$type: 'CreateComItem';
    queryId: bigint;
    amount: bigint;
}

export function storeCreateComItem(src: CreateComItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1949473619, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadCreateComItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1949473619) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'CreateComItem' as const, queryId: _queryId, amount: _amount };
}

function loadTupleCreateComItem(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'CreateComItem' as const, queryId: _queryId, amount: _amount };
}

function storeTupleCreateComItem(source: CreateComItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCreateComItem(): DictionaryValue<CreateComItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateComItem(src)).endCell());
        },
        parse: (src) => {
            return loadCreateComItem(src.loadRef().beginParse());
        }
    }
}

export type Details = {
    $$type: 'Details';
    content: string;
    completed: boolean;
}

export function storeDetails(src: Details) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.content);
        b_0.storeBit(src.completed);
    };
}

export function loadDetails(slice: Slice) {
    let sc_0 = slice;
    let _content = sc_0.loadStringRefTail();
    let _completed = sc_0.loadBit();
    return { $$type: 'Details' as const, content: _content, completed: _completed };
}

function loadTupleDetails(source: TupleReader) {
    let _content = source.readString();
    let _completed = source.readBoolean();
    return { $$type: 'Details' as const, content: _content, completed: _completed };
}

function storeTupleDetails(source: Details) {
    let builder = new TupleBuilder();
    builder.writeString(source.content);
    builder.writeBoolean(source.completed);
    return builder.build();
}

function dictValueParserDetails(): DictionaryValue<Details> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDetails(src)).endCell());
        },
        parse: (src) => {
            return loadDetails(src.loadRef().beginParse());
        }
    }
}

 type ShortItem_init_args = {
    $$type: 'ShortItem_init_args';
    parent: Address;
    seqno: bigint;
}

function initShortItem_init_args(src: ShortItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.seqno, 257);
    };
}

async function ShortItem_init(parent: Address, seqno: bigint) {
    const __code = Cell.fromBase64('te6ccgECEgEAA2QAART/APSkE/S88sgLAQIBYgIDAu7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsv/yFADzxbJWMzKAMntVA8EAgFYCQoC7gGSMH/gcCHXScIflTAg1wsf3iCCEOwbezG6jh0w0x8BghDsG3sxuvLggdQB0DEy+EJSQMcF8uQQf+AgghDPAIxMuuMCghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwBQYBjDDTHwGCEM8AjEy68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDEx+EJSQMcF8uQQfwFwgEJ/VSBtbW3bPH8HATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAcByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsACACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAgFICwwAEbCvu1E0NIAAYAIBIA0OAhGsNW2ebZ42IUAPEAB1rN3Ghq0uDM5nReXqLasrBuZG6kopjUnGq0om6cqtJylqCUsMag9GSOZuCY7Jhu6tzymG6w8vLCoukEAB3u1E0NQB+GPSAAGOLPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//UAdAB0gBVMGwU4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPBEAAlwABosIcA==');
    const __system = Cell.fromBase64('te6cckECFAEAA24AAQHAAQEFoAKzAgEU/wD0pBP0vPLICwMCAWIECgLu0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLggsj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbL/8hQA88WyVjMygDJ7VQQBQLuAZIwf+BwIddJwh+VMCDXCx/eIIIQ7Bt7MbqOHTDTHwGCEOwbezG68uCB1AHQMTL4QlJAxwXy5BB/4CCCEM8AjEy64wKCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAGBwGMMNMfAYIQzwCMTLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTH4QlJAxwXy5BB/AXCAQn9VIG1tbds8fwgBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAJAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFYCwwAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAIBSA0OABGwr7tRNDSAAGACASAPEwIRrDVtnm2eNiFAEBIB3u1E0NQB+GPSAAGOLPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//UAdAB0gBVMGwU4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPBEABosIcAACXAB1rN3Ghq0uDM5nReXqLasrBuZG6kopjUnGq0om6cqtJylqCUsMag9GSOZuCY7Jhu6tzymG6w8vLCoukEDl3gz2');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initShortItem_init_args({ $$type: 'ShortItem_init_args', parent, seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ShortItem_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    1040: { message: `Parent Only` },
}

const ShortItem_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewVideo","header":3237407972,"fields":[{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"UpdateVideo","header":1685543179,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"InternalSetContent","header":3961223985,"fields":[{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CompleteVideo","header":3075533923,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"InternalComplete","header":3472919628,"fields":[{"name":"excess","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewVideoResponse","header":8580272,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"UpdateVideoResponse","header":3417007650,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"InternalAdd","header":306259763,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"origin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1943715420,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateCom","header":3610565249,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateComItem","header":1949473619,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Details","header":null,"fields":[{"name":"content","type":{"kind":"simple","type":"string","optional":false}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const ShortItem_getters: ABIGetter[] = [
    {"name":"details","arguments":[],"returnType":{"kind":"simple","type":"Details","optional":false}},
]

const ShortItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalSetContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalComplete"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class ShortItem implements Contract {
    
    static async init(parent: Address, seqno: bigint) {
        return await ShortItem_init(parent, seqno);
    }
    
    static async fromInit(parent: Address, seqno: bigint) {
        const init = await ShortItem_init(parent, seqno);
        const address = contractAddress(0, init);
        return new ShortItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ShortItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ShortItem_types,
        getters: ShortItem_getters,
        receivers: ShortItem_receivers,
        errors: ShortItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalSetContent | InternalComplete | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalSetContent') {
            body = beginCell().store(storeInternalSetContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalComplete') {
            body = beginCell().store(storeInternalComplete(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getDetails(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('details', builder.build())).stack;
        const result = loadTupleDetails(source);
        return result;
    }
    
}