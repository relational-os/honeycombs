import React, { useEffect, useState } from "react";

import Modal from "react-modal";

import { useWallet } from "@gimmixorg/use-wallet";
import NewBlockButton from "./newBlockButton";

import { ENSName, AddressDisplayEnum } from "react-ens-name";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ConnectWalletButton = () => {
  const { account, provider, connect, disconnect } = useWallet();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [network, setNetwork] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (provider) {
      provider.getNetwork().then((n) => {
        if (n.chainId == 1) setNetwork("mainnet");
        else setNetwork(n.name);
      });
    }
  });

  return (
    <div className="authentication">
      {account == undefined ? (
        <button onClick={() => connect()}>Connect Wallet</button>
      ) : (
        <div className="disconnect">
          <button style={{ fontSize: "1rem" }} onClick={openModal}>
            <ENSName
              address={account}
              displayType={AddressDisplayEnum.FIRST4_LAST4}
              withEllipses={true}
            ></ENSName>
          </button>
          <button onClick={() => disconnect()} className="disconnect">
            <b>Disconnect Wallet</b>
          </button>
          <div className="center-flex">
            <span className="dot"></span>
            <div style={{ marginRight: ".5rem", fontSize: "1rem" }}>
              network: {network}
            </div>
          </div>

          <NewBlockButton></NewBlockButton>

          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
          >
            <h1>THIS IS A MODAL</h1>
            <button onClick={closeModal}>close</button>
          </Modal>
        </div>
      )}

      <style jsx>
        {`
          .center-flex {
            display: flex;
            align-items: center;
          }

          .authentication {
            position: fixed;
            top: 1rem;
            right: 1rem;
          }

          button {
            padding: 0.5rem 1rem;
            background: linear-gradient(180deg, #4d9aff 0%, #006eff 100%),
              #006eff;
            color: #fff;
            border-radius: 36px;
            border: 0;
            outline: 0;
            cursor: pointer;
            font-size: 18px;
          }

          button.disconnect {
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            background: transparent;
            color: #666;
          }

          @media screen and (max-width: 768px) {
            .authentication {
              top: auto;
              bottom: 1.5rem;
              right: 1rem;
              z-index: 111;
            }
          }

          .dot {
            height: 0.5rem;
            width: 0.5rem;
            background-color: ${network == "rinkeby" ? "#0f0" : "#f00"};
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
            margin-right: 0.5rem;
          }
        `}
      </style>
    </div>
  );
};

export default ConnectWalletButton;
