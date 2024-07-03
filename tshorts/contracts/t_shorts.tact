import "@stdlib/deploy";
import "@stdlib/ownable";

import "./messages";
import "./t_shorts_item";

import "./t_shorts_user";

contract TShorts with Deployable, Ownable {
    numVideos: Int as uint32;

    owner: Address;

    createVideoCommission: Int = ton("0.05");

    createVideoItemValue: Int = ton("0.02");
    createUserValue: Int = ton("0.02");
    createUserItemValue: Int = ton("0.02");

    init() {
        self.numVideos = 0;

        self.owner = sender();
    }

    receive(msg: CreateCom) {
        self.createVideoCommission = msg.amount;

        // Notify the caller that the receiver was executed and forward remaining value back
        self.notify("Cashback".asComment());
    }

    receive(msg: CreateComItem) {
        self.createVideoItemValue = msg.amount;

        // Notify the caller that the receiver was executed and forward remaining value back
        self.notify("Cashback".asComment());
    }

    receive(msg: CreateComUser) {
        self.createUserValue = msg.amount;
        self.notify("Cashback".asComment());
    }

    receive(msg: CreateComUserItem) {
        self.createUserItemValue = msg.amount;
        self.notify("Cashback".asComment());
    }

    receive(msg: Withdraw){
        // A built-in method to check that the message is sent by the owner of the contract
        self.requireOwner();
        require(msg.amount < myBalance() , "Too much!");
        send(SendParameters{
            to: self.owner,
            value: msg.amount,
            mode: SendIgnoreErrors,
            body: "Get your tokens!".asComment()
        });
    }

    get fun balance(): Int{
        return myBalance();
    }

    fun createUser(parent: Address, user: Address, videoId: Int, com: Int) {

        // creating a like link
        let init: StateInit = initOf TShortsUser(parent, user);
        send(SendParameters{
            to: contractAddress(init),
            body: NewUser{queryId: now(), videoId: videoId, createUserItemValue: self.createUserItemValue}.toCell(),
            value: com,             // pay for the deployment and leave some TON in the child for storage
            mode: SendIgnoreErrors,
            code: init.code,                // deploy the child if needed
            data: init.data
        });
    }


    receive(msg: NewVideo) {

        // resulting commission
        let resCom: Int = self.createVideoCommission + self.createVideoItemValue + self.createUserValue + self.createUserItemValue;

        require(context().value >= resCom, "Insufficient funds!");


        self.numVideos = self.numVideos + 1;
        let init: StateInit = initOf TShortsItem(myAddress(), self.numVideos);

        send(SendParameters{
            to: contractAddress(init),
            body: InternalSetUserContent{content: msg.content, user: sender()}.toCell(),
            value: self.createVideoItemValue,
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });

        self.createUser(myAddress(), sender(), self.numVideos, self.createUserValue);


    }

    receive(msg: UpdateVideo) {
        require(msg.seqno <= self.numVideos, "Video does not exist");

        let init: StateInit = initOf TShortsItem(myAddress(), msg.seqno);

        send(SendParameters{
            to: contractAddress(init),
            body: InternalSetContent{content: msg.content, user: sender()}.toCell(),
            value: self.createVideoItemValue,
            mode: SendIgnoreErrors,
            code: init.code,
            data: init.data
        });

        self.reply(UpdateVideoResponse{seqno: msg.seqno}.toCell());
    } 

    receive(msg: CompleteVideo){

        require(msg.seqno <= self.numVideos, "Video does not exist");
        send(SendParameters{
            to: contractAddress(initOf TShortsItem(myAddress(), msg.seqno)),
            body: InternalComplete{excess: myAddress(), user: sender()}.toCell(),
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun numVideos(): Int {
        return self.numVideos;
    }

    get fun shortAddress(seqno: Int): Address{
        return contractAddress(initOf TShortsItem(myAddress(), seqno));
    }

    get fun userShortAddress(user: Address): Address{
        return contractAddress(initOf TShortsUser(myAddress(), user));
    }
}
