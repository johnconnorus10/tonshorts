import "@stdlib/deploy";

import "./messages";

contract LikeItem with Deployable {

    parent: Address;
    id: Int;  // id short video

    from: Address;
    counter: Int;
    dt: Int;
 
    init(parent: Address, id: Int, from: Address) {
        self.parent = parent;
        self.id = id;
        self.from = from;
        self.dt = now();

        self.counter = 0;
    }

        // internal message sent by one child to another to update balances
    receive(msg: NewLike) {
        require(sender()==self.parent, "Parent Only");

        self.counter = self.counter + 1;
        self.dt = now();
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun dt(): Int {
        return self.dt;
    }
}
