const colors = [
  "#fa4b13", // Orioles Orange
  "#f27242", // Chinese Orange
  "#670e0f", // Blood (Organ)
  "#1C1C1C", // Eerie Black
  // "#CCCCCC", // Light Gray
  "#E0E0E0", // Platinum
  "#DAA520", // Goldenrod
];

let dim = 16;
let canvas_exists = false;

const getRandomInt = () => {
  return Math.floor(Math.random() * (colors.length - 1))
}

const body = document.querySelector("body")

const btn = document.createElement("button");
btn.textContent = "Resize Grid"
btn.style.backgroundColor = "#CCCCCC";
btn.addEventListener("click", () => {
  dim = prompt("Choose a grid size (1-100): ")
  while (dim > 100 || dim < 1) {
      dim = prompt("Choose a grid size (1-100): ");
  }
  remove_boxes();
  draw_boxes(dim);
})
body.appendChild(btn)

const canvas = document.createElement("div");
canvas.classList.add("canvas");
body.appendChild(canvas);

const draw_boxes = (dim) => {
  for (i = 0; i < dim; i++) {
		const shelf = document.createElement("div");
		shelf.classList.add("shelf");
		canvas.append(shelf);

		for (j = 0; j < dim; j++) {
			const box = document.createElement("div");

			box.classList.add("box");
			box.addEventListener("mouseover", (e) => {
				let currentOpacity = parseFloat(e.target.style.opacity);

				if (e.shiftKey) {
					if (currentOpacity > 0.0) {
						currentOpacity = Math.max(currentOpacity - 0.1, 0);
					}
				} else if (e.metaKey || e.ctrlKey) {
					currentOpacity = Math.min(currentOpacity + 0.1, 1);
				} else {
					e.target.style.backgroundColor = `${colors[getRandomInt()]}`;
          currentOpacity = 1;
				}
        
				e.target.style.opacity = currentOpacity.toFixed(1);
			});

			shelf.appendChild(box);
		}
	}
}

draw_boxes(dim)

const remove_boxes = () => {
  document.querySelectorAll(".shelf").forEach(e => e.remove())
  document.querySelectorAll(".box").forEach(e => e.remove());
}

const instructions = document.createElement("div");
instructions.classList.add("instructions");
body.appendChild(instructions);

const darken = document.createElement("p");
darken.textContent = "Darken - Shift (⇧) + Hover";
instructions.appendChild(darken);

const hover = document.createElement("p");
hover.textContent = "Draw - Hover";
instructions.appendChild(hover);

const lighten = document.createElement("p");
lighten.textContent = "Ligthen - Cmd (⌘) / Ctrl (^✲) + Hover";
instructions.appendChild(lighten);

// const footer = document.createElement("div");
// footer.textContent = "Odin: Etch-a-Sketch";
// footer.style.color = "#CCCCCC";
// body.appendChild(footer);
