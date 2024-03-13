import { createSignal, type Component } from "solid-js";

import styles from "./ApiGui.module.css";
import InputField from "../components/InputField";
import IconButton from "../components/IconButton";

enum Method {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

const ApiGui: Component = () => {
  const [method, setMethod] = createSignal(Method.Get);
  const [url, setUrl] = createSignal("");
  const [content, setContent] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);

  const fetchFromUrl = async () => {
    setContent("");
    setIsLoading(true);
    const response = await fetch(`https://${url()}`, { method: method() }).then(
      (response) => response.text()
    );
    setContent(response);
    setIsLoading(false);
  };

  return (
    <div style={{ display: "flex", "flex-direction": "column", gap: "1em" }}>
      <span class={styles.interactivesBox}>
        <span style={{ display: "flex", gap: "1em" }}>
          <select
            class={styles.list}
            value={method()}
            onChange={(e) => setMethod(e.target.value as Method)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <span class={styles.showSmall}>
            <IconButton icon="⇅" onClick={fetchFromUrl} />
          </span>
        </span>
        <span style={{ display: "flex", gap: "1em" }}>
          <InputField
            type="text"
            value={url()}
            onInput={(e) => setUrl(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && url().length > 3 && fetchFromUrl()
            }
            placeholder="api.endpoint.com/parameter"
          />
          <span class={styles.showLarge}>
            <IconButton icon="⇅" onClick={fetchFromUrl} />
          </span>
        </span>
      </span>
      <div class={styles.scrollBox}>
        <span
          class={styles.loader}
          style={{ display: isLoading() ? "flex" : "none" }}
        >
          loading
        </span>
        {content()}
      </div>
    </div>
  );
};

export default ApiGui;
