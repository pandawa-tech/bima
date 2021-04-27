<script>
  import { onMount } from "svelte";
  import "../styles/theme.css";
  import "../styles/animation.css";
  import isMobile from "./utilities/isMobile";

  const ANIMATION_SPEED_MS = 20;
  const MIN_VALUE = isMobile() ? 15 : 5;
  const NUMBER_OF_ARRAY_BARS = isMobile() ? 15 : 25;
  const ARRAY_BARS_WIDTH = 20;
  const PRIMARY_BAR_COLOR = "turquoise";
  const SECONDARY_BAR_COLOR = "#F80";
  let isSorting = false;
  let isSorted = false;
  let options = [
    { value: "bubble", text: "Bubble" },
    { value: "heap", text: "Heap" },
    { value: "insertion", text: "Insertion" },
    { value: "intro", text: "Intro" },
    { value: "merge", text: "Merge" },
    { value: "quick", text: "Quick" },
  ];
  let selected = "bubble";

  let array = [
    100,
    70,
    240,
    140,
    110,
    160,
    270,
    200,
    280,
    250,
    260,
    50,
    120,
    150,
    80,
    90,
    180,
    190,
    60,
    220,
    130,
    230,
    290,
    210,
    170,
  ];

  onMount(() => {
    if (isMobile()) resetArray();
  });

  function doJump() {
    const arrayBars = document.getElementsByClassName("array-bar");
    (function myLoop(i, idx = 0) {
      setTimeout(function () {
        arrayBars[idx++].classList.add("jump");
        if (--i) {
          myLoop(i, idx++);
        } else {
          isSorting = false;
          isSorted = true;
          document.getElementById("nav-wrapper").style.transform =
            "translate(-50%, 0%)";
        }
      }, 100);
    })(arrayBars.length);
  }

  function resetArray() {
    if (isSorting) return;
    const arrayTemp = [];
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].classList.add("reset");
    }
    import("./utilities/randomIntFromInterval").then(module => {
      while (arrayTemp.length < NUMBER_OF_ARRAY_BARS) {
        let r = module.default(MIN_VALUE, NUMBER_OF_ARRAY_BARS + MIN_VALUE - 1);
        if (arrayTemp.indexOf(r) === -1) arrayTemp.push(r);
      }
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].classList.remove("jump");
      }
      isSorting = false;
      isSorted = false;
      array = arrayTemp;
    });
  }

  function doSort(animations) {
    let isChange = false;
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i][2];
      if (isColorChange) {
        isChange = !isChange;
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = isChange ? SECONDARY_BAR_COLOR : PRIMARY_BAR_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      doJump();
    }, animations.length * ANIMATION_SPEED_MS);
  }

  function parseSortNameToFunc(name) {
    if (isSorting || isSorted) return;
    isSorting = true;
    const arrayBars = document.getElementsByClassName("array-bar");
    document.getElementById("nav-wrapper").style.transform =
      "translate(-50%, 200%)";
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].classList.remove("reset");
    }
    switch (name) {
      case "merge":
        import("pandawa-sort-animation/dist/algorithms/mergeSort").then((fun) => {
          doSort(fun.getMergeSortAnimations(array));
        });
        break;
      case "bubble":
        import("pandawa-sort-animation/dist/algorithms/bubbleSort").then((fun) => {
          doSort(fun.getBubbleSortAnimations(array));
        });
        break;
      case "insertion":
        import("pandawa-sort-animation/dist/algorithms/insertionSort").then((fun) => {
          doSort(fun.getInsertionSortAnimations(array));
        });
        break;
      case "heap":
        import("pandawa-sort-animation/dist/algorithms/heapSort").then((fun) => {
          doSort(fun.getHeapSortAnimations(array));
        });
        break;
      case "quick":
        import("pandawa-sort-animation/dist/algorithms/quickSort").then((fun) => {
          doSort(fun.getQuickSortAnimations(array));
        });
        break;
      case "intro":
        import("pandawa-sort-animation/dist/algorithms/introSort").then((fun) => {
          doSort(fun.getIntroSortAnimations(array));
        });
        break;
    }
  }
</script>

<svelte:head>
  <title>Bima | Algorithm Visualizer</title>
  <meta name="description" content="Algorithm Visualizer" />
  <meta name="keywords" content="Algorithm, Visualizer" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://bima.priambudi.fyi" />
  <meta property="og:title" content="Bima | Algorithm Visualizer" />
  <meta property="og:description" content="Algorithm Visualizer" />
</svelte:head>

<div class="array-container">
  {#each array as value, idx}
    <div
      class="array-bar"
      key={idx}
      style="width: {`${ARRAY_BARS_WIDTH}px`}; height: {`${value}px`}"
    />
  {/each}
</div>

<div id="nav-wrapper">
  <nav>
    <button class="nav-button" disabled={isSorting} on:click={resetArray}
      >Generate</button
    >
    <button
      class="nav-button"
      disabled={isSorted || isSorting}
      on:click={() => parseSortNameToFunc(selected)}>Start</button
    >
    <select
      bind:value={selected}
      on:change={()=>{
		  if (isSorted) resetArray()
	  }}
      on:blur
      disabled={isSorting}
      class="nav-button"
      name="sorts"
      id="sorts"
    >
      <optgroup label="Search" />
      {#each options as option}
        <option value={option.value}>{option.text}</option>
      {/each}
    </select>
  </nav>
</div>

<style>
  .array-container {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: 90vw;
    min-height: 350px;
  }
  .array-bar {
    display: inline-block;
    margin: 0 1px;
    border-radius: 2px;
    background-color: var(--theme-secondary);
  }

  #nav-wrapper {
    position: fixed;
    padding: 0.8em 1em;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 32px;
    background-color: var(--theme-primary);
    border-radius: 50px;
    width: 250px;
    transition: transform 1s;
  }

  .nav-button {
    width: 30%;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
