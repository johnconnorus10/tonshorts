import { useState, useEffect } from 'react';

import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { SenderArguments } from "ton-core";
import { Sender } from "ton-core";

export const useTonConnect = () => {

    const [tonConnectUI] = useTonConnectUI()
    const wallet = useTonWallet()

    return {
        sender: {
            send: async (args) => {
              tonConnectUI.sendTransaction({
                messages: [
                  {
                    address: args.to.toString(),
                    amount: args.value.toString(),
                    payload: args.body?.toBoc().toString("base64"),
                  },
                ],
                validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
              });
            },
            address: wallet?.account?.address ? Address.parse(wallet?.account?.address) : undefined
          }, 

        connected: !!wallet?.account.address,
        wallet: wallet?.account.address ?? null,
        network: wallet?.account.chain ?? null
        
    }

};