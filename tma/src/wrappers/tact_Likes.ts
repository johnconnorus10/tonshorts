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
    user: Address;
    content: string;
}

export function storeInternalSetContent(src: InternalSetContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(423538493, 32);
        b_0.storeAddress(src.user);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadInternalSetContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 423538493) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _content = sc_0.loadStringRefTail();
    return { $$type: 'InternalSetContent' as const, user: _user, content: _content };
}

function loadTupleInternalSetContent(source: TupleReader) {
    let _user = source.readAddress();
    let _content = source.readString();
    return { $$type: 'InternalSetContent' as const, user: _user, content: _content };
}

function storeTupleInternalSetContent(source: InternalSetContent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
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

export type InternalSetUserContent = {
    $$type: 'InternalSetUserContent';
    user: Address;
    content: string;
}

export function storeInternalSetUserContent(src: InternalSetUserContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3570367033, 32);
        b_0.storeAddress(src.user);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadInternalSetUserContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3570367033) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _content = sc_0.loadStringRefTail();
    return { $$type: 'InternalSetUserContent' as const, user: _user, content: _content };
}

function loadTupleInternalSetUserContent(source: TupleReader) {
    let _user = source.readAddress();
    let _content = source.readString();
    return { $$type: 'InternalSetUserContent' as const, user: _user, content: _content };
}

function storeTupleInternalSetUserContent(source: InternalSetUserContent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeString(source.content);
    return builder.build();
}

function dictValueParserInternalSetUserContent(): DictionaryValue<InternalSetUserContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalSetUserContent(src)).endCell());
        },
        parse: (src) => {
            return loadInternalSetUserContent(src.loadRef().beginParse());
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
    user: Address;
    excess: Address;
}

export function storeInternalComplete(src: InternalComplete) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(95445885, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.excess);
    };
}

export function loadInternalComplete(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 95445885) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _excess = sc_0.loadAddress();
    return { $$type: 'InternalComplete' as const, user: _user, excess: _excess };
}

function loadTupleInternalComplete(source: TupleReader) {
    let _user = source.readAddress();
    let _excess = source.readAddress();
    return { $$type: 'InternalComplete' as const, user: _user, excess: _excess };
}

function storeTupleInternalComplete(source: InternalComplete) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
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

export type CreateComLink = {
    $$type: 'CreateComLink';
    queryId: bigint;
    amount: bigint;
}

export function storeCreateComLink(src: CreateComLink) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1254673799, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadCreateComLink(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1254673799) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'CreateComLink' as const, queryId: _queryId, amount: _amount };
}

function loadTupleCreateComLink(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'CreateComLink' as const, queryId: _queryId, amount: _amount };
}

function storeTupleCreateComLink(source: CreateComLink) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCreateComLink(): DictionaryValue<CreateComLink> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateComLink(src)).endCell());
        },
        parse: (src) => {
            return loadCreateComLink(src.loadRef().beginParse());
        }
    }
}

export type CreateComCreator = {
    $$type: 'CreateComCreator';
    queryId: bigint;
    amount: bigint;
}

export function storeCreateComCreator(src: CreateComCreator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3417125948, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadCreateComCreator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3417125948) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'CreateComCreator' as const, queryId: _queryId, amount: _amount };
}

function loadTupleCreateComCreator(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'CreateComCreator' as const, queryId: _queryId, amount: _amount };
}

function storeTupleCreateComCreator(source: CreateComCreator) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCreateComCreator(): DictionaryValue<CreateComCreator> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateComCreator(src)).endCell());
        },
        parse: (src) => {
            return loadCreateComCreator(src.loadRef().beginParse());
        }
    }
}

export type NewLike = {
    $$type: 'NewLike';
    queryId: bigint;
}

export function storeNewLike(src: NewLike) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2326380819, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadNewLike(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2326380819) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadIntBig(257);
    return { $$type: 'NewLike' as const, queryId: _queryId };
}

function loadTupleNewLike(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'NewLike' as const, queryId: _queryId };
}

function storeTupleNewLike(source: NewLike) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserNewLike(): DictionaryValue<NewLike> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewLike(src)).endCell());
        },
        parse: (src) => {
            return loadNewLike(src.loadRef().beginParse());
        }
    }
}

export type NewShortLink = {
    $$type: 'NewShortLink';
    videoId: bigint;
    creator: Address;
}

export function storeNewShortLink(src: NewShortLink) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3709634643, 32);
        b_0.storeInt(src.videoId, 257);
        b_0.storeAddress(src.creator);
    };
}

export function loadNewShortLink(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3709634643) { throw Error('Invalid prefix'); }
    let _videoId = sc_0.loadIntBig(257);
    let _creator = sc_0.loadAddress();
    return { $$type: 'NewShortLink' as const, videoId: _videoId, creator: _creator };
}

function loadTupleNewShortLink(source: TupleReader) {
    let _videoId = source.readBigNumber();
    let _creator = source.readAddress();
    return { $$type: 'NewShortLink' as const, videoId: _videoId, creator: _creator };
}

function storeTupleNewShortLink(source: NewShortLink) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.videoId);
    builder.writeAddress(source.creator);
    return builder.build();
}

function dictValueParserNewShortLink(): DictionaryValue<NewShortLink> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewShortLink(src)).endCell());
        },
        parse: (src) => {
            return loadNewShortLink(src.loadRef().beginParse());
        }
    }
}

export type NewUser = {
    $$type: 'NewUser';
    queryId: bigint;
    createUserItemValue: bigint;
    videoId: bigint;
}

export function storeNewUser(src: NewUser) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2892727589, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.createUserItemValue, 257);
        b_0.storeInt(src.videoId, 257);
    };
}

export function loadNewUser(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2892727589) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadIntBig(257);
    let _createUserItemValue = sc_0.loadIntBig(257);
    let _videoId = sc_0.loadIntBig(257);
    return { $$type: 'NewUser' as const, queryId: _queryId, createUserItemValue: _createUserItemValue, videoId: _videoId };
}

function loadTupleNewUser(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _createUserItemValue = source.readBigNumber();
    let _videoId = source.readBigNumber();
    return { $$type: 'NewUser' as const, queryId: _queryId, createUserItemValue: _createUserItemValue, videoId: _videoId };
}

function storeTupleNewUser(source: NewUser) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.createUserItemValue);
    builder.writeNumber(source.videoId);
    return builder.build();
}

function dictValueParserNewUser(): DictionaryValue<NewUser> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewUser(src)).endCell());
        },
        parse: (src) => {
            return loadNewUser(src.loadRef().beginParse());
        }
    }
}

export type CreateComUser = {
    $$type: 'CreateComUser';
    queryId: bigint;
    amount: bigint;
}

export function storeCreateComUser(src: CreateComUser) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(268729552, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadCreateComUser(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 268729552) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'CreateComUser' as const, queryId: _queryId, amount: _amount };
}

function loadTupleCreateComUser(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'CreateComUser' as const, queryId: _queryId, amount: _amount };
}

function storeTupleCreateComUser(source: CreateComUser) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCreateComUser(): DictionaryValue<CreateComUser> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateComUser(src)).endCell());
        },
        parse: (src) => {
            return loadCreateComUser(src.loadRef().beginParse());
        }
    }
}

export type CreateComUserItem = {
    $$type: 'CreateComUserItem';
    queryId: bigint;
    amount: bigint;
}

export function storeCreateComUserItem(src: CreateComUserItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(30034383, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadCreateComUserItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 30034383) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'CreateComUserItem' as const, queryId: _queryId, amount: _amount };
}

function loadTupleCreateComUserItem(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'CreateComUserItem' as const, queryId: _queryId, amount: _amount };
}

function storeTupleCreateComUserItem(source: CreateComUserItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserCreateComUserItem(): DictionaryValue<CreateComUserItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateComUserItem(src)).endCell());
        },
        parse: (src) => {
            return loadCreateComUserItem(src.loadRef().beginParse());
        }
    }
}

export type NewUserItem = {
    $$type: 'NewUserItem';
    user: Address;
    videoId: bigint;
}

export function storeNewUserItem(src: NewUserItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2689033943, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.videoId, 257);
    };
}

export function loadNewUserItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2689033943) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _videoId = sc_0.loadIntBig(257);
    return { $$type: 'NewUserItem' as const, user: _user, videoId: _videoId };
}

function loadTupleNewUserItem(source: TupleReader) {
    let _user = source.readAddress();
    let _videoId = source.readBigNumber();
    return { $$type: 'NewUserItem' as const, user: _user, videoId: _videoId };
}

function storeTupleNewUserItem(source: NewUserItem) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.videoId);
    return builder.build();
}

function dictValueParserNewUserItem(): DictionaryValue<NewUserItem> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNewUserItem(src)).endCell());
        },
        parse: (src) => {
            return loadNewUserItem(src.loadRef().beginParse());
        }
    }
}

 type Likes_init_args = {
    $$type: 'Likes_init_args';
}

function initLikes_init_args(src: Likes_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Likes_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initLikes_init_args({ $$type: 'Likes_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Likes_errors: { [key: number]: { message: string } } = {
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
}

const Likes_types: ABIType[] = [
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
    {"name":"InternalSetContent","header":423538493,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"InternalSetUserContent","header":3570367033,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"CompleteVideo","header":3075533923,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"InternalComplete","header":95445885,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"excess","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewVideoResponse","header":8580272,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"UpdateVideoResponse","header":3417007650,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"InternalAdd","header":306259763,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"origin","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1943715420,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateCom","header":3610565249,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateComItem","header":1949473619,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateComLink","header":1254673799,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateComCreator","header":3417125948,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"NewLike","header":2326380819,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"NewShortLink","header":3709634643,"fields":[{"name":"videoId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"creator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NewUser","header":2892727589,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"createUserItemValue","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"videoId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CreateComUser","header":268729552,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CreateComUserItem","header":30034383,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"NewUserItem","header":2689033943,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"videoId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Likes_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"shortLinkAddress","arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"likeItemAddress","arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"allLikes","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"createItemContractCom","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"createItemValue","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"createItemCreatorCom","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Likes_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCom"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateComItem"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateComLink"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateComCreator"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NewShortLink"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Likes implements Contract {
    
    static async init() {
        return await Likes_init();
    }
    
    static async fromInit() {
        const init = await Likes_init();
        const address = contractAddress(0, init);
        return new Likes(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Likes(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Likes_types,
        getters: Likes_getters,
        receivers: Likes_receivers,
        errors: Likes_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateCom | CreateComItem | CreateComLink | CreateComCreator | NewShortLink | Withdraw | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateCom') {
            body = beginCell().store(storeCreateCom(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateComItem') {
            body = beginCell().store(storeCreateComItem(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateComLink') {
            body = beginCell().store(storeCreateComLink(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateComCreator') {
            body = beginCell().store(storeCreateComCreator(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NewShortLink') {
            body = beginCell().store(storeNewShortLink(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
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
    
    async getShortLinkAddress(provider: ContractProvider, id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(id);
        let source = (await provider.get('shortLinkAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getLikeItemAddress(provider: ContractProvider, id: bigint, user: Address) {
        let builder = new TupleBuilder();
        builder.writeNumber(id);
        builder.writeAddress(user);
        let source = (await provider.get('likeItemAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getAllLikes(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('allLikes', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCreateItemContractCom(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('createItemContractCom', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCreateItemValue(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('createItemValue', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getCreateItemCreatorCom(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('createItemCreatorCom', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}