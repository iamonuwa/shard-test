import { FC, ReactNode } from "react";

type SnackProps = {
  children: ReactNode;
  transitionDuration: number;
  onDismiss: () => void;
  transitionState: any;
};

const snackStates = {
  entering: { transform: "translate3d(0, 120%, 0) scale(0.9)" },
  entered: { transform: "translate3d(0, 0, 0) scale(1)" },
  exiting: { transform: "translate3d(0, 120%, 0) scale(0.9)" },
  exited: { transform: "translate3d(0, 120%, 0) scale(0.9)" },
};

export const Snack: FC<SnackProps> = ({ children, transitionDuration, transitionState, onDismiss }) => {
  // @ts-ignore
  const state = snackStates[transitionState];
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "rgb(49, 49, 49)",
        borderRadius: 2,
        boxShadow: `
          0px 3px 5px -1px rgba(0, 0, 0, 0.2),
          0px 6px 10px 0px rgba(0, 0, 0, 0.14),
          0px 1px 18px 0px rgba(0, 0, 0, 0.12)`,
        color: "#fff",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        fontFamily: "Roboto",
        // marginBottom: 8,
        minWidth: 288,
        maxWidth: 568,
        padding: "6px 24px",
        pointerEvents: "initial",
        transitionProperty: `transform`,
        transitionDuration: `${transitionDuration}ms`,
        transitionTimingFunction: `cubic-bezier(0.2, 0, 0, 1)`,
        transformOrigin: "bottom",
        zIndex: 2,
        ...state,
      }}
    >
      <div style={{ fontSize: "0.875rem", padding: "8px 0" }}>{children}</div>
      <div
        onClick={onDismiss}
        role="button"
        style={{
          color: "#1d4ed8",
          cursor: "pointer",
          fontSize: "0.8125rem",
          marginLeft: "auto",
          padding: "7px 8px",
          textTransform: "uppercase",
        }}
      >
        Undo
      </div>
    </div>
  );
};
