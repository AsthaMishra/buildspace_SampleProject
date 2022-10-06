import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NotificationProvider>
        <MoralisProvider initializeOnMount={false}>
          <Component {...pageProps} />
        </MoralisProvider>
      </NotificationProvider>
    </>
  );
}

export default MyApp;
