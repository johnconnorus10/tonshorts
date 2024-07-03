import "@stdlib/deploy";
import "@stdlib/ownable";

import "./short_link";
import "./like_item";
import "./messages";

// the token parent, mostly used to query general metadata and get children addresses
contract Likes with Deployable, Ownable {

    owner: Address;
 
    allLikes: Int;

    createItemContractCom: Int = ton("0.015"); // income contract
    createItemCreatorCom: Int = ton("0.085"); // income content creator

    createItemValue: Int = ton("0.02"); // item storage fee
    createLinkValue: Int = ton("0.02"); // item storage fee

    init() {
        self.allLikes = 0;

        self.owner = sender();
    }


    receive(msg: CreateCom) {
        self.createItemContractCom = msg.amount;
        self.notify("Cashback".asComment());
    }

    receive(msg: CreateComItem) {
        self.createItemValue = msg.amount;
        self.notify("Cashback".asComment());
    }

    receive(msg: CreateComLink) {
        self.createLinkValue = msg.amount;
        self.notify("Cashback".asComment());
    }

    receive(msg: CreateComCreator) {
        self.createItemCreatorCom = msg.amount;
        self.notify("Cashback".asComment());
    }

    fun createShortLink(parent: Address, videoId: Int, com: Int) {
        // creating a like link
        let init: StateInit = initOf ShortLink(parent, videoId);
        send(SendParameters{
            to: contractAddress(init),
            body: NewLike{queryId: now()}.toCell(),
            value: com,             // pay for the deployment and leave some TON in the child for storage
            mode: SendIgnoreErrors,
            code: init.code,                // deploy the child if needed
            data: init.data
        });


    }

    fun createLike(parent: Address, videoId: Int, user: Address, com: Int) {
        // creating a like item
        let init: StateInit = initOf LikeItem(parent, videoId, user);
        send(SendParameters{
            to: contractAddress(init),
            body: NewLike{queryId: now()}.toCell(),
            value: com,             // pay for the deployment and leave some TON in the child for storage
            mode: SendIgnoreErrors,
            code: init.code,                // deploy the child if needed
            data: init.data
        });

    }


    receive(msg: NewShortLink) {

        // resulting commission
        let resCom: Int = self.createItemContractCom + self.createItemCreatorCom + self.createItemValue + self.createLinkValue;

        require(context().value >= resCom, "Insufficient funds!");

        self.createLike(myAddress(), msg.videoId, sender(), self.createItemValue);

        self.createShortLink(myAddress(), msg.videoId, self.createLinkValue);

        // we send part of the commission to the content creator
        send(SendParameters{
            to: msg.creator,
            value: self.createItemCreatorCom,
            mode: SendIgnoreErrors,
            body: "Get your tokens(Ton Shorts / Likes)!".asComment()
        });

        self.allLikes = self.allLikes + 1;
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


    get fun shortLinkAddress(id: Int): Address {
        return contractAddress(initOf ShortLink(myAddress(), id));
    }

    get fun likeItemAddress(id: Int, user: Address): Address {
        return contractAddress(initOf LikeItem(myAddress(), id, user));
    }


    get fun allLikes(): Int {
        return self.allLikes;
    }


    get fun createItemContractCom(): Int {
        return self.createItemContractCom;
    }

    get fun createItemValue(): Int {
        return self.createItemValue;
    }

    get fun createItemCreatorCom(): Int {
        return self.createItemCreatorCom;
    }
}