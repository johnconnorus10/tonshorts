import "@stdlib/deploy";
import "@stdlib/ownable";


message Withdraw{
    amount : Int as coins;
}

message CreateCom {
    amount: Int as uint32;
}

contract Donations with Deployable, Ownable {
    id: Int as uint32;
    owner: Address;

    balance: Int as uint256 = 0;

    const MinTonForStorage: Int = ton("0.01"); // enough for 1 KB of storage for 2.5 years
    minAmount: Int = ton("0.1");

    init(id: Int) {
        self.id = id;
        self.owner = sender();
    }

    receive(msg: CreateCom) {
        self.minAmount = msg.amount;

        // Notify the caller that the receiver was executed and forward remaining value back
        self.notify("Cashback".asComment());
    }

    receive("Donation"){
        // context() returns data of the incoming message: sender, value, type(bounced, not bounced) and its raw representation
        self.balance = self.balance + context().value;
    }

    receive(msg: Withdraw){
        // A built-in method to check that the message is sent by the owner of the contract
        self.requireOwner();

        let amount: Int = min(msg.amount, myBalance() - context().value - self.MinTonForStorage);
        require(amount > 0, "Insufficient balance");

        self.balance = self.balance - msg.amount;
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendRemainingValue + SendIgnoreErrors
        });

    }

    get fun balanceCalc(): Int{
        return self.balance;
    }

    get fun balance(): String {
        return myBalance().toCoinsString();
    }

    get fun id(): Int {
        return self.id;
    }

}
