import "@stdlib/deploy";

import "./messages";

contract ShortLink with Deployable {

    parent: Address;
    id: Int;  // id short video

    counter: Int;
 
    init(parent: Address, id: Int) {
        self.parent = parent;
        self.id = id;
        self.counter = 0;
    }

        // internal message sent by one child to another to update balances
    receive(msg: NewLike) {
        require(sender()==self.parent, "Parent Only");

        self.counter = self.counter + 1;
    }

    get fun counter(): Int {
        return self.counter;
    }
}
