import "@stdlib/deploy";

import "./messages";

struct TSDetails{
    videoId: Int;
    dt: Int;
    completed: Bool;
}

contract TShortsUserItem with Deployable {

    parent: Address;
    user: Address;
    id: Int = 0;
    videoId: Int = 0; // link to short video

    dt: Int; // created date 
    completed: Bool = false;

    init(parent: Address, user: Address, id: Int) {
        self.parent = parent;
        self.user = user;
        self.id = id;

        self.dt = now();
    }

        // internal message sent by one child to another to update balances
    receive(msg: NewUserItem) {
        require(sender()==self.parent, "Parent Only");
        require(msg.user==self.user, "Access error");

        self.videoId = msg.videoId;

        self.dt = now();
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

    get fun details(): TSDetails {
        return TSDetails{videoId: self.videoId, dt: self.dt, completed: self.completed};
    }

    get fun videoId(): Int {
        return self.videoId;
    }
    
    get fun dt(): Int {
        return self.dt;
    }
}