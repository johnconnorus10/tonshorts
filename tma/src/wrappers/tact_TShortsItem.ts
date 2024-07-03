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

export type Details = {
    $$type: 'Details';
    user: Address;
    content: string;
    completed: boolean;
}

export function storeDetails(src: Details) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.user);
        b_0.storeStringRefTail(src.content);
        b_0.storeBit(src.completed);
    };
}

export function loadDetails(slice: Slice) {
    let sc_0 = slice;
    let _user = sc_0.loadAddress();
    let _content = sc_0.loadStringRefTail();
    let _completed = sc_0.loadBit();
    return { $$type: 'Details' as const, user: _user, content: _content, completed: _completed };
}

function loadTupleDetails(source: TupleReader) {
    let _user = source.readAddress();
    let _content = source.readString();
    let _completed = source.readBoolean();
    return { $$type: 'Details' as const, user: _user, content: _content, completed: _completed };
}

function storeTupleDetails(source: Details) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
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

export type TSDetails = {
    $$type: 'TSDetails';
    videoId: bigint;
    dt: bigint;
    completed: boolean;
}

export function storeTSDetails(src: TSDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.videoId, 257);
        b_0.storeInt(src.dt, 257);
        b_0.storeBit(src.completed);
    };
}

export function loadTSDetails(slice: Slice) {
    let sc_0 = slice;
    let _videoId = sc_0.loadIntBig(257);
    let _dt = sc_0.loadIntBig(257);
    let _completed = sc_0.loadBit();
    return { $$type: 'TSDetails' as const, videoId: _videoId, dt: _dt, completed: _completed };
}

function loadTupleTSDetails(source: TupleReader) {
    let _videoId = source.readBigNumber();
    let _dt = source.readBigNumber();
    let _completed = source.readBoolean();
    return { $$type: 'TSDetails' as const, videoId: _videoId, dt: _dt, completed: _completed };
}

function storeTupleTSDetails(source: TSDetails) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.videoId);
    builder.writeNumber(source.dt);
    builder.writeBoolean(source.completed);
    return builder.build();
}

function dictValueParserTSDetails(): DictionaryValue<TSDetails> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTSDetails(src)).endCell());
        },
        parse: (src) => {
            return loadTSDetails(src.loadRef().beginParse());
        }
    }
}

 type TShortsItem_init_args = {
    $$type: 'TShortsItem_init_args';
    parent: Address;
    seqno: bigint;
}

function initTShortsItem_init_args(src: TShortsItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeInt(src.seqno, 257);
    };
}

async function TShortsItem_init(parent: Address, seqno: bigint) {
    const __code = Cell.fromBase64('te6ccgECFwEABFkAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCEwQFAgFYDQ4E9gGSMH/gcCHXScIflTAg1wsf3iCCENTPejm6jkEw0x8BghDUz3o5uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQEmwSMjP4QlJQxwXy5BACf+AgghAZPq89uuMCIIIQBbBjfbrjAoIQlGqYtrrjAgYHCAkAtMj4QwHMfwHKAFVAUFQg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSy//IWM8WyQHMEsoAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVACSMNMfAYIQGT6vPbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0BJsEjT4QlJgxwXy5BAhggCE1ALHBfL0fwHkMNMfAYIQBbBjfbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBIz+EJSYMcF8uQQIYIAhNQCxwXy9H8CcIBCf1UgbW1t2zx/CwFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CgAEMHABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAMAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCAUgPEAARsK+7UTQ0gABgAgEgERICEaw1bZ5tnjYpwBMUAHWs3caGrS4MzmdF5eotqw4vRosGichvCWmIik9NDq1q6ugmjU3prerq607NSMrpqOsOiYoOSMinCixQQAHK7UTQ1AH4Y9IAAY5N+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/9QB0AHSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgVFEMwbBXg+CjXCwqDCbry4IkVAAZUcCEBVvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEB2zwWAAiLCHAj');
    const __system = Cell.fromBase64('te6cckECGQEABGMAAQHAAQEFoCyhAgEU/wD0pBP0vPLICwMCAWIEDgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLgghQFDQT2AZIwf+BwIddJwh+VMCDXCx/eIIIQ1M96ObqOQTDTHwGCENTPejm68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdASbBIyM/hCUlDHBfLkEAJ/4CCCEBk+rz264wIgghAFsGN9uuMCghCUapi2uuMCBgcIDACSMNMfAYIQGT6vPbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0BJsEjT4QlJgxwXy5BAhggCE1ALHBfL0fwHkMNMfAYIQBbBjfbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBIz+EJSYMcF8uQQIYIAhNQCxwXy9H8CcIBCf1UgbW1t2zx/CgFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwKAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAsAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwABDBwALTI+EMBzH8BygBVQFBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEsv/yFjPFskBzBLKAAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQCAVgPEAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAgFIERIAEbCvu1E0NIAAYAIBIBMYAhGsNW2ebZ42KcAUFwHK7UTQ1AH4Y9IAAY5N+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/9QB0AHSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgVFEMwbBXg+CjXCwqDCbry4IkVAVb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8FgAIiwhwIwAGVHAhAHWs3caGrS4MzmdF5eotqw4vRosGichvCWmIik9NDq1q6ugmjU3prerq607NSMrpqOsOiYoOSMinCixQQMAKKEo=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTShortsItem_init_args({ $$type: 'TShortsItem_init_args', parent, seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TShortsItem_errors: { [key: number]: { message: string } } = {
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
    34004: { message: `Access error` },
    39963: { message: `Insufficient funds!` },
    42374: { message: `Too much!` },
    55869: { message: `Video does not exist` },
}

const TShortsItem_types: ABIType[] = [
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
    {"name":"Details","header":null,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"string","optional":false}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TSDetails","header":null,"fields":[{"name":"videoId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"dt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"completed","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const TShortsItem_getters: ABIGetter[] = [
    {"name":"details","arguments":[],"returnType":{"kind":"simple","type":"Details","optional":false}},
]

const TShortsItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InternalSetUserContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalSetContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalComplete"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TShortsItem implements Contract {
    
    static async init(parent: Address, seqno: bigint) {
        return await TShortsItem_init(parent, seqno);
    }
    
    static async fromInit(parent: Address, seqno: bigint) {
        const init = await TShortsItem_init(parent, seqno);
        const address = contractAddress(0, init);
        return new TShortsItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TShortsItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TShortsItem_types,
        getters: TShortsItem_getters,
        receivers: TShortsItem_receivers,
        errors: TShortsItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InternalSetUserContent | InternalSetContent | InternalComplete | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalSetUserContent') {
            body = beginCell().store(storeInternalSetUserContent(message)).endCell();
        }
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