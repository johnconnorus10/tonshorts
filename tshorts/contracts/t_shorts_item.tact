import "@stdlib/deploy";
import "./messages";

struct Details{
    user: Address;
    content: String;
    completed: Bool;
}

contract TShortsItem with Deployable {
    parent: Address;
    seqno: Int as uint256;
    content: String = "";
    completed: Bool = false;
    user: Address;

    init(parent: Address, seqno: Int) {
        self.parent = parent;
        self.seqno = seqno;
        self.user = parent;
    }

    receive(msg: InternalSetUserContent) {
        require(sender()==self.parent, "Parent Only");
        self.user = msg.user;
        self.content = msg.content;
    }

    receive(msg: InternalSetContent) {
        require(sender()==self.parent, "Parent Only");
        require(msg.user==self.user, "Access error");

        self.content = msg.content;
    }

    receive(msg: InternalComplete){
        require(sender()==self.parent, "Parent Only");
        require(msg.user==self.user, "Access error");

        self.completed = true;
        send(SendParameters{
            to: msg.excess,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    get fun details(): Details {
        return Details{user: self.user, content: self.content, completed: self.completed};
    }
}
