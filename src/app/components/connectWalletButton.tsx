import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import { useWallet } from "@gimmixorg/use-wallet";
import { ENSName, AddressDisplayEnum } from "react-ens-name";
import NewBlockButton from "./newBlockButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "400px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    textAlign: "center",
    padding: "0.25rem 0.5rem",
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
        <button className="connect" onClick={() => connect()}>
          Connect Wallet
        </button>
      ) : (
        <>
          <NewBlockButton></NewBlockButton>

          <div className="account-tray">
            <button className="account" onClick={openModal}>
              <img
                className="avatar"
                src="https://pbs.twimg.com/profile_images/1251260906220052480/cOMgsw0X_400x400.jpg"
              />
              <ENSName
                address={account}
                displayType={AddressDisplayEnum.FIRST4_LAST4}
                withEllipses={true}
              ></ENSName>
            </button>

            <div className="network">
              <span className="dot"></span>
              <div className="name">{network}</div>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Account"
              // @ts-ignore
              style={customStyles}
            >
              <div className="modal-bar">
                <div className="title">Account</div>
                <button onClick={closeModal} className="close">
                  close
                </button>
              </div>

              <div className="account" onClick={openModal}>
                <img
                  className="avatar"
                  src="https://pbs.twimg.com/profile_images/1251260906220052480/cOMgsw0X_400x400.jpg"
                />
                <ENSName
                  address={account}
                  displayType={AddressDisplayEnum.FIRST4_LAST4}
                  withEllipses={true}
                ></ENSName>
              </div>

              <button onClick={() => disconnect()} className="disconnect">
                Disconnect Wallet
              </button>
            </Modal>
          </div>
        </>
      )}

      <style jsx>
        {`
          .modal-bar {
            display: flex;
            align-items: center;
            padding: 0.25rem 0;
            justify-content: space-between;
          }

          .authentication {
            position: fixed;
            top: 1rem;
            right: 1rem;
          }

          .account-tray {
            position: fixed;
            bottom: 1rem;
            left: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          button {
            background: transparent;
            border: 0;
            outline: 0;
            cursor: pointer;
          }

          button.connect {
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
            margin: 1rem auto 1rem auto;
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

          .account {
            height: 25px;
            padding: 0 0.75rem 0 0;
            border-radius: 16px;
            background: rgba(223, 164, 164, 0.1);
            font-size: 0.9rem;
            font-weight: bold;
            line-height: 25px;
            transition: 0.2s background ease-in-out;
          }

          div.account {
            margin-top: 2rem;
            background: transparent;
          }

          button.account:hover {
            background: rgba(0, 0, 0, 0.2);
          }

          img.avatar {
            margin-right: 0.5rem;
            width: 25px;
            height: 25px;
            border-radius: 100%;
            vertical-align: bottom;
          }

          @media screen and (max-width: 768px) {
            .authentication {
              top: auto;
              bottom: 1.5rem;
              right: 1rem;
              z-index: 111;
            }

            .account-tray {
              display: block;
            }
          }

          .network {
            display: flex;
            align-items: center;
            margin-top: 0.3rem;
          }

          .network > .name {
            font-size: 0.85rem;
            color: rgba(0, 0, 0, 0.6);
            color: ${network == "rinkeby" ? "#8AC735" : "#ff0d00"};
            text-transform: capitalize;
          }

          .network > .dot {
            height: 0.5rem;
            width: 0.5rem;
            background-color: ${network == "rinkeby" ? "#8AC735" : "#ff0d00"};
            border-radius: 50%;
            display: inline-block;
            margin-right: 0.4rem;
          }
        `}
      </style>
    </div>
  );
};

export default ConnectWalletButton;
