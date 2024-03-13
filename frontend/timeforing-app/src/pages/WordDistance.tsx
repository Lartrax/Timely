import { For, createEffect, createSignal, on, type Component } from "solid-js";

import styles from "./WordDistance.module.css";
import Button from "../components/Button";
import InputField from "../components/InputField";

import { invoke } from "@tauri-apps/api/core";

enum Moves {
  Use = "Use",
  Move1Back = "Move1Back",
  Move2Back = "Move2Back",
  Move1Forth = "Move1Forth",
  Move2Forth = "Move2Forth",
  Add = "Add",
}

type WordDistanceResponse = {
  distance: number;
  moves: Moves[];
};

const WordDistance: Component = () => {
  const [search, setSearch] = createSignal("");
  const [filteredFoods, setFilteredFoods] = createSignal<string[]>([]);
  const [isSearching, setIsSearching] = createSignal(false);
  const [searchText, setSearchText] = createSignal("Search...");
  const [selectedFood, setSelectedFood] = createSignal("");
  const [moves, setMoves] = createSignal<Moves[]>([]);
  const [info, setInfo] = createSignal<{
    distance: number;
    threshold: number;
  }>({ distance: 0, threshold: 0 });

  const foods = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "pear",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli",
    "watermelon",
    "xigua",
    "yuzu",
    "zucchini",
  ];

  const loader = ["..⋅", ".⋅·", "⋅·⋅", "·⋅.", "⋅..", "..."];

  // Filter foods based on distance between search and foods
  createEffect(
    on([selectedFood, search], async () => {
      const threshold = Math.min(Math.max(search().length - 2, 2), 5);

      if (!search()) {
        setFilteredFoods(foods);
        return;
      }

      // Get word-distance
      const filteredFoods = await Promise.all(
        foods.map(async (food) => {
          const resp = await invoke<WordDistanceResponse>("word_distance", {
            first: search().toLowerCase(),
            second: food,
          });

          // Update info and moves if there is a selected food and it matches current food
          if (food === selectedFood()) {
            setInfo({ distance: resp.distance, threshold });
            setMoves(resp.moves);
          }

          // Return food to let through filter
          if (resp.distance < threshold) {
            return { food, distance: resp.distance };
          }
        })
      );
      setFilteredFoods(foods.filter((_, index) => filteredFoods[index]?.food));
    })
  );

  // Cool search animation
  createEffect(
    on(isSearching, () => {
      let index = 0;
      const interval = setInterval(() => {
        setSearchText(
          "Search" +
            // " ".repeat(index / (loader.length - 1)) + // Cooler snake effect // Too cool
            loader[index % loader.length]
        );

        index += 1;

        if (!isSearching()) {
          clearInterval(interval);
          setSearchText("Search...");
        }
      }, 200);
    })
  );

  // Update canvas when moves or search changes
  createEffect(
    on([moves, search], () => {
      // No need to update canvas if no food is selected, canvas isn't even rendered
      if (selectedFood()) {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d");

        if (ctx) {
          drawLines(ctx, moves());
        }
      }
    })
  );

  // Canvas renderer
  const drawLines = (ctx: CanvasRenderingContext2D, moves: Moves[]) => {
    const height = 150;
    const width = 300;
    const length =
      search().length > selectedFood().length
        ? search().length
        : selectedFood().length;

    const offset = width / (length * (4 * (length / 8)) + 3);
    const seperation = width / (length / 1.06);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.lineWidth = width / (length * 40);
    ctx.strokeStyle = "#222";

    search()
      .split("")
      .forEach((_, i) => {
        let moveToX = seperation * i + offset;
        let moveToY = 0;
        const lineToX = seperation * i + offset;
        let lineToY = height;

        // Different lines for different moves
        switch (moves[i]) {
          case Moves.Move1Back:
            moveToX = seperation * (i + 1) + offset;
            break;
          case Moves.Move2Back:
            moveToX = seperation * (i + 2) + offset;
            break;
          case Moves.Move1Forth:
            moveToX = seperation * (i - 1) + offset;
            break;
          case Moves.Move2Forth:
            moveToX = seperation * (i - 2) + offset;
            break;
          case Moves.Add:
            moveToY = height / 1.5;
            break;
        }
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
      });
    ctx.stroke();
  };

  return (
    <div class={styles.container}>
      <div style={{ display: "flex", "flex-direction": "column", gap: "1em" }}>
        <InputField
          type="search"
          maxLength={12}
          class={styles.search}
          value={search()}
          onInput={(e) => setSearch(e.target.value)}
          onFocusIn={() => setIsSearching(true)}
          onFocusOut={() => setIsSearching(false)}
          onMouseDown={async (e) =>
            e.button === 2 && setSearch(await navigator.clipboard.readText())
          }
          placeholder={searchText()}
        />
        <div
          class={styles.scrollBox}
          style={selectedFood() && { "min-height": "1em" }}
        >
          <For each={filteredFoods()}>
            {(food) => (
              <span
                style={selectedFood() === food ? { "font-weight": "bold" } : {}}
              >
                <Button
                  text={food}
                  style={{ border: "none" }}
                  onClick={() => {
                    if (selectedFood() === food) {
                      setSelectedFood("");
                    } else {
                      setSelectedFood(food);
                    }
                  }}
                />
              </span>
            )}
          </For>
        </div>
      </div>
      {selectedFood() && (
        <div class={styles.breakdownBox}>
          <p>Breakdown</p>
          <p
            style={{
              "font-size": "0.75em",
              color: "#555",
              "text-align": "left",
            }}
          >
            Distance will drop to zero
            <br />
            if one contains the other
          </p>
          <div style={{ width: "90%" }}>
            <span
              style={{ display: "flex", "justify-content": "space-between" }}
            >
              <p>Distance</p>
              <p>{info().distance.toFixed(1)}</p>
            </span>
            <span
              style={{ display: "flex", "justify-content": "space-between" }}
            >
              <p>Threshold</p>
              <p>{info().threshold.toFixed(1)}</p>
            </span>
          </div>
          <div class={styles.illustrationBox}>
            <span style={{ display: "flex", gap: "1em" }}>
              <For each={search().split("")}>
                {(char) => <p style={{ width: "1em" }}>{char}</p>}
              </For>
            </span>
            <canvas id="canvas" class={styles.canvas} />
            <span style={{ display: "flex", gap: "1em" }}>
              <For each={selectedFood().split("")}>
                {(char) => <p style={{ width: "1em" }}>{char}</p>}
              </For>
            </span>
          </div>
          <p>Distance calcualtion</p>
          <p
            style={{
              "font-size": "0.75em",
              color: "#555",
              "text-align": "left",
            }}
          >
            Using a char costs 0
            <br />
            Moving costs 0.4 per index
            <br />
            Adding costs 1
          </p>
        </div>
      )}
    </div>
  );
};

export default WordDistance;
