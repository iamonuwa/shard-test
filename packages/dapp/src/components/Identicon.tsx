import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useLayoutEffect, useMemo, useRef } from "react";
import jazzicon from "@metamask/jazzicon";

const Identicon = () => {
  const { account } = useActiveWeb3React();

  const icon = useMemo(() => account && jazzicon(16, parseInt(account.slice(2, 10), 16)), [account]);

  const iconRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const current = iconRef.current;
    if (icon) {
      current?.appendChild(icon);
      return () => {
        try {
          current?.removeChild(icon);
        } catch (e) {
          console.error("Avatar icon not found");
        }
      };
    }
    return;
  }, [icon, iconRef]);

  return <div ref={iconRef} />;
};

export default Identicon;
