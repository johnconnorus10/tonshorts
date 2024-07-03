message NewVideo{
    content: String;
}

message UpdateVideo{
    seqno: Int as uint256;
    content: String;
}


message InternalSetContent{
    user: Address;
    content: String;
}

message InternalSetUserContent{
    user: Address;
    content: String;
}

message CompleteVideo{
    seqno: Int as uint256;
}

message InternalComplete{
    user: Address;
    excess: Address;
}

message NewVideoResponse{
    seqno: Int as uint256;
}

message UpdateVideoResponse{
    seqno: Int as uint256;
}

message InternalAdd{
    amount: Int as coins;
    origin: Address;
}

message Transfer {
    amount: Int as coins;
    to: Address;
}

message Withdraw{
    amount : Int as coins;
}

message CreateCom {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message CreateComItem {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message CreateComLink {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message CreateComCreator {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message NewLike {
    queryId: Int;
}

message NewShortLink {
    videoId: Int;
    creator: Address;
}


message NewUser {
    queryId: Int;
    createUserItemValue: Int;
    videoId: Int;
}

message CreateComUser {
    queryId: Int as uint64;
    amount: Int as uint32;
}

message CreateComUserItem {
    queryId: Int as uint64;
    amount: Int as uint32;
}


message NewUserItem {
    user: Address;
    videoId: Int;
}
