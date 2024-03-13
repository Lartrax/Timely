import { createSignal, type Component } from "solid-js";

import styles from "./PrimeNumbers.module.css";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import InputField from "../components/InputField";

import { invoke } from "@tauri-apps/api/core";

type Primes = {
  duration: string;
  primes: number[];
};

const PrimeNumbers: Component = () => {
  const [limit, setLimit] = createSignal<number>();
  const [response, setResponse] = createSignal<Primes>();
  const [isLoading, setIsLoading] = createSignal(false);

  const getPrimes = async () => {
    setResponse(undefined);
    setIsLoading(true);

    if ((limit() ?? 0) < 11) {
      setLimit(11);
    }
    setResponse(await invoke<Primes>("get_primes", { limit: limit() ?? 11 }));
    setIsLoading(false);
  };

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: "1em" }}>
      <div class={styles.mathBox}>
        <InputField
          type="text"
          value={
            limit()
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ") ?? "" // Add space every 3 digits
          }
          min={11}
          max={20000000}
          onInput={(e) =>
            setLimit(
              parseInt(e.target.value)
                ? parseInt(e.target.value.replace(/\D/g, "")) // Remove non-digits
                : undefined
            )
          }
          placeholder="Limit"
        />
        <span style={{ display: "flex" }}>
          <IconButton
            icon="max"
            style={{
              "border-top-left-radius": "0.5rem",
              "border-bottom-left-radius": "0.5rem",
              "margin-left": "0.5em",
            }}
            onClick={() => setLimit(20000000)}
          />
          <IconButton
            icon="½"
            onClick={() => setLimit((prev) => Math.round((prev ?? 0) / 2))}
          />
          <IconButton
            icon="¾"
            onClick={() =>
              setLimit((prev) => Math.round((prev ?? 0) - (prev ?? 0) / 4))
            }
          />
          <IconButton
            icon="⅒"
            style={{
              "border-top-right-radius": "0.5rem",
              "border-bottom-right-radius": "0.5rem",
            }}
            onClick={() => setLimit((prev) => Math.round((prev ?? 0) / 10))}
          />
        </span>
      </div>
      <Button text="Get primes" onClick={getPrimes} />
      <p>Time: {response()?.duration}</p>
      <div class={styles.scrollBox}>
        <span
          class={styles.loader}
          style={{ display: isLoading() ? "flex" : "none" }}
        >
          sieving
        </span>
        {response()?.primes.toString()}
      </div>
    </div>
  );
};

export default PrimeNumbers;
