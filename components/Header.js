import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <>
      <nav className="flex flex-row border-b-4 ">
        <h1 className="font-bold text-3xl px-4 py-4">Wave at me!!</h1>
        <div className="ml-auto px-4 py-4">
          <ConnectButton />
        </div>
      </nav>
    </>
  );
}
