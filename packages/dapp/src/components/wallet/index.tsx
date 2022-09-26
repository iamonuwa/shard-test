import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { FC, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import Option from "./Option";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Pending from "./Pending";
import usePrevious from "hooks/usePrevious";
import { useWalletModal } from "store/hooks/useWallet";
import { injected, SUPPORTED_WALLETS } from "connectors";
import { Modal } from "components/Modal";
import AccountDetails from "components/AccountDetails";
import Link from "next/link";

interface WalletProps {
  ENSName?: string;
}

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

const WalletModal: FC<WalletProps> = () => {
  const { active, account, connector, activate, error, chainId } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  const { isOpen, openWalletDialog, closeWalletDialog } = useWalletModal();

  const previousAccount = usePrevious(account);

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && isOpen) {
      openWalletDialog();
    }
  }, [account, previousAccount, openWalletDialog, isOpen]);

  // always reset to account view
  useEffect(() => {
    if (isOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [isOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (isOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, isOpen, activePrevious, connectorPrevious]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = "";
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount();
          console.log("Wallet Address ", walletAddress);
        })
        .catch(error => {
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true);
          }
        });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask =
      // @ts-ignore
      typeof window && window?.ethereum !== "undefined" && window?.ethereum && window?.ethereum?.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];
      // check for mobile options
      if (isMobile) {
        // @ts-ignore
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.icon}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        // @ts-ignore
        if (!(window.web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={"#E8831D"}
                header={<div>Install Metamask</div>}
                subheader={null}
                link={"https://metamask.io/"}
                icon={"metamask_wallet_logo.png"}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.icon}
          />
        )
      );
    });
  }

  function getModalContent() {
    if (error) {
      return (
        <div className="text-sm">
          <div>
            <div className="flex w-full justify-between">
              {error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error connecting"}
            </div>
          </div>
          <div>
            {error instanceof UnsupportedChainIdError ? (
              <div>Please connect to the appropriate Ethereum network.</div>
            ) : (
              <div className="">Error connecting. Try refreshing the page.</div>
            )}
          </div>
        </div>
      );
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails toggleWalletModal={closeWalletDialog} openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)} />
      );
    }
    return (
      <>
        <div className="">
          <div className="text-lg font-medium leading-6 text-gray-900">Connect Wallet</div>
        </div>
        <div className="text-sm">
          <div>
            By connecting a wallet, you agree to{" "}
            <Link className="outline-none" href="#">
              ShardLabs&apos; Term of Service
            </Link>{" "}
            and acknowledges that you have read and understand the{" "}
            <Link href="#" className="">
              ShardLabs Disclaimer
            </Link>
          </div>
          {walletView === WALLET_VIEWS.PENDING ? (
            <Pending
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <div className="py-4">{getOptions()}</div>
          )}
        </div>
        <div className="text-sm">
          New to Ethereum?{" "}
          <Link target="_blank" className="" href="https://ethereum.org">
            Learn more about wallets
          </Link>
        </div>
      </>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={closeWalletDialog}>
      <div className="space-y-4">{getModalContent()}</div>
    </Modal>
  );
};

export default WalletModal;
