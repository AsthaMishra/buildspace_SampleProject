import { useEffect, useState } from "react";
import { useChain, useMoralis, useWeb3Contract } from "react-moralis";
import { Button, useNotification } from "web3uikit";
import { addresses, wave_hardhat_abi } from "../constants/constants";

export default function Wave() {
  const { isWeb3Enabled } = useMoralis();
  const { chainId: chainIdHex } = useChain();
  const chainId = parseInt(chainIdHex);
  const dispatch = useNotification();
  const waveAddress = chainId in addresses ? addresses[chainId] : null;

  const [totalWaves, SetTotalWaves] = useState(0);

  let validAddress = false;

  if (waveAddress == null || waveAddress == 0 || waveAddress == undefined) {
    validAddress = false;
  } else {
    validAddress = true;
  }

  const {
    data,
    error,
    runContractFunction: waveFunction,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: wave_hardhat_abi,
    contractAddress: waveAddress,
    functionName: "wave",
    params: {},
  });

  const { runContractFunction: getWaveCount } = useWeb3Contract({
    abi: wave_hardhat_abi,
    contractAddress: waveAddress,
    functionName: "getTotalWaves",
    params: {},
  });

  async function UpdateUI() {
    const waveCount = (await getWaveCount()).toString();
    console.log(`waveCount : ${waveCount}`);
    SetTotalWaves(waveCount);
  }

  useEffect(() => {
    isWeb3Enabled && validAddress ? (
      UpdateUI()
    ) : (
      <div>Waiting for connection</div>
    );
  }, [isWeb3Enabled, validAddress]);

  function handleNotification(_type, _message) {
    dispatch({
      type: _type,
      message: _message,
      title: "New Notification",
      icon: "bell",
      position: "topR",
    });
  }

  async function OnSuccess(tx) {
    tx.wait(1);
    handleNotification("success", "Hi There");
  }

  async function OnError(error) {
    handleNotification("error", error);
  }

  return (
    <>
      <div>
        {validAddress ? (
          <div className="mr-auto px-4 py-4 flex flex-col">
            <Button
              onClick={async function () {
                await waveFunction({ onError: OnError, onSuccess: OnSuccess });
              }}
              text="Wave at me!!"
              disabled={isFetching || isLoading}
              theme="primary"
            />

            <h1 className="mr-auto px-4 py-4">
              Total wave count is {totalWaves}{" "}
            </h1>
          </div>
        ) : (
          <div className=" font-bold text-2xl">
            waiting for connection, You are on incompatible chain
          </div>
        )}
      </div>
    </>
  );
}
