import { createSignal, type Component } from "solid-js";

import styles from "./SortingAlgorithms.module.css";
import Button from "../components/Button";
import InputField from "../components/InputField";

import { invoke } from "@tauri-apps/api/core";

type Sorted = {
  duration: string;
  iterations: string;
  sorted: number[];
};

enum SortType {
  Timsort = "timsort",
  Bogo = "bogo",
  FullBogo = "fullbogo",
  CountingBTree = "counting_btree",
}

const SortingAlgorithms: Component = () => {
  const [length, setLength] = createSignal<number | undefined>();
  const [span, setSpan] = createSignal<number | undefined>();
  const [sortType, setSortType] = createSignal<SortType>(SortType.Bogo);
  const [response, setResponse] = createSignal<Sorted>();
  const [isLoading, setIsLoading] = createSignal(false);

  const sort = async () => {
    setResponse(undefined);
    setIsLoading(true);

    if (!length()) {
      setLength(10);
    }
    if (!span()) {
      setSpan(10);
    }

    setResponse(
      await invoke<Sorted>("get_sort", {
        sortType: sortType(),
        length: length(),
        span: span(),
      })
    );
    setIsLoading(false);
  };

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: "1em" }}>
      <select
        class={styles.list}
        value={sortType()}
        onChange={(e) => setSortType(e.target.value as SortType)}
      >
        <option value="timsort">Timsort</option>
        <option value="bogo">Bogo</option>
        <option value="fullbogo">Full Bogo</option>
        <option value="counting_btree">Counting Binary Tree</option>
      </select>
      <div style={{ display: "flex", gap: "1em" }}>
        <InputField
          type="text"
          value={
            length()
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ") ?? "" // Add space every 3 digits
          }
          min={10}
          max={1000000}
          onInput={(e) =>
            setLength(
              parseInt(e.target.value)
                ? parseInt(e.target.value.replace(/\D/g, "")) // Remove non-digits
                : undefined
            )
          }
          placeholder="Length"
        />
        <InputField
          type="text"
          value={
            span()
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ") ?? "" // Add space every 3 digits
          }
          min={0}
          onInput={(e) =>
            setSpan(
              parseInt(e.target.value)
                ? parseInt(e.target.value.replace(/\D/g, "")) // Remove non-digits
                : undefined
            )
          }
          placeholder="Span"
        />
      </div>
      <Button text="Sort" onClick={sort} />
      <div style={{ display: "flex", "justify-content": "space-evenly" }}>
        <p>Time: {response()?.duration}</p>
        <p>Iterations: {response()?.iterations}</p>
      </div>
      <div class={styles.scrollBox}>
        <span
          class={styles.loader}
          style={{ display: isLoading() ? "flex" : "none" }}
        >
          sorting
        </span>
        {response()?.sorted.toString()}
      </div>
    </div>
  );
};

export default SortingAlgorithms;
