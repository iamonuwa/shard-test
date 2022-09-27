import { UnsupportedChainIdError } from "@web3-react/core";
import Button, { ButtonProps } from "components/Button";
import { useWalletModal } from "store/hooks/useWallet";
import { shortenHex } from "utils/format";
import { FC } from "react";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";

const Web3ConnectButton: FC<ButtonProps> = ({ ...rest }) => {
  const { active, account, error } = useActiveWeb3React();

  const { toggleDialog } = useWalletModal();

  let button: JSX.Element;
  if (active && account) {
    button = (
      <Button {...rest} variant="primary" onClick={toggleDialog}>
        {shortenHex(account)}
      </Button>
    );
  } else if (error) {
    button = (
      <Button {...rest} variant="danger" onClick={toggleDialog}>
        <div>{error instanceof UnsupportedChainIdError ? <span>Wrong network</span> : <span>Error</span>}</div>
      </Button>
    );
  } else {
    button = (
      <Button {...rest} variant="primary" onClick={toggleDialog}>
        Connect Wallet
      </Button>
    );
  }

  return button;
};

const Web3Status: FC<ButtonProps> = ({ ...rest }) => {
  return <Web3ConnectButton {...rest} />;
};

export default Web3Status;
