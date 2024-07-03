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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
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

 type Shorts_init_args = {
    $$type: 'Shorts_init_args';
}

function initShorts_init_args(src: Shorts_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Shorts_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initShorts_init_args({ $$type: 'Shorts_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Shorts_errors: { [key: number]: { message: string } } = {
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
    39963: { message: `Insufficient funds!` },
    42374: { message: `Too much!` },
    55869: { message: `Video does not exist` },
}

const Shorts_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
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

const Shorts_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"numVideos","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"shortAddress","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Shorts_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCom"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateComItem"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NewVideo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateVideo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CompleteVideo"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Shorts implements Contract {
    
    static async init() {
        return await Shorts_init();
    }
    
    static async fromInit() {
        const init = await Shorts_init();
        const address = contractAddress(0, init);
        return new Shorts(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Shorts(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Shorts_types,
        getters: Shorts_getters,
        receivers: Shorts_receivers,
        errors: Shorts_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateCom | CreateComItem | Withdraw | NewVideo | UpdateVideo | CompleteVideo | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateCom') {
            body = beginCell().store(storeCreateCom(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateComItem') {
            body = beginCell().store(storeCreateComItem(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NewVideo') {
            body = beginCell().store(storeNewVideo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateVideo') {
            body = beginCell().store(storeUpdateVideo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CompleteVideo') {
            body = beginCell().store(storeCompleteVideo(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getNumVideos(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numVideos', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getShortAddress(provider: ContractProvider, seqno: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        let source = (await provider.get('shortAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}