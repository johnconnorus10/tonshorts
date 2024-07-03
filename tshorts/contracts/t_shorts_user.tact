import "@stdlib/deploy";

import "./messages";

import "./t_shorts_user_item";

contract TShortsUser with Deployable {
    parent: Address;
    user: Address;  // id short video

    counter: Int;
 
    init(parent: Address, user: Address) {
        self.parent = parent;
        self.user = user;
        self.counter = 0;
    }

        // internal message sent by one child to another to update balances
    receive(msg: NewUser) {
        require(sender()==self.parent, "Parent Only");

        self.counter = self.counter + 1;

       self.createUserItem(self.parent, sender(), msg.videoId, self.counter,  msg.createUserItemValue);
    }


    fun createUserItem(parent: Address, user: Address, videoId: Int, id: Int, com: Int) {

        // creating a like link
        let init: StateInit = initOf TShortsUserItem(parent, user, id);
        send(SendParameters{
            to: contractAddress(init),
            body: NewUserItem{videoId: videoId, user: user }.toCell(),
            value: com,             // pay for the deployment and leave some TON in the child for storage
            mode: SendIgnoreErrors,
            code: init.code,                // deploy the child if needed
            data: init.data
        });
    }

    get fun itemAddress(id: Int): Address{
        return contractAddress(initOf TShortsUserItem(self.parent, self.user, id));
    }

    get fun counter(): Int {
        return self.counter;
    }
}