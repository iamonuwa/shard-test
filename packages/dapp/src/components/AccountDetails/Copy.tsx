import useCopyClipboard from "hooks/useCopyClipboard";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { FC } from "react";

interface CopyProps {
  toCopy: string;
}

const Copy: FC<CopyProps> = ({ toCopy }) => {
  const [isCopied, setCopied] = useCopyClipboard();
  return (
    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setCopied(toCopy)}>
      <ClipboardDocumentIcon className="h-4 w-4" />
      <div className="">{isCopied ? "Copied" : "Copy Address"}</div>
    </div>
  );
};

export default Copy;
