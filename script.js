const ROWS = 3; //橫列
const COLUMNS = 3; //直行
const ELEMENTS = ROWS * COLUMNS; //總數
const LIGHTS = 5; //要亮的格數

const game = document.getElementById("game"); //主棋盤
document.documentElement.style.setProperty('--table-width', ROWS * COLUMNS + "em"); //定義table的CSS寬度
const table = new Array(ROWS);

const randomArray = new Array(ELEMENTS); //要被隨機的陣列
//初始化隨機陣列
for (let index = 0; index < ELEMENTS; index++)
randomArray[index] = index;
//洗牌隨機陣列
for (let index = 0; index < ELEMENTS - 1; index++)
{
    const swapIndex = Math.trunc(Math.random() * (ELEMENTS - index - 1)) + index + 1;
    const tempValue = randomArray[swapIndex];
    randomArray[swapIndex] = randomArray[index];
    randomArray[index] = tempValue;
}

const lights = new Array(ELEMENTS); //要被點亮的陣列
lights.fill(false); //先預設為false
for (let index = 0; index < LIGHTS; index++)
    lights[randomArray[index]] = true; //根據洗牌的結果決定要亮的格子

for (let row = 0; row < ROWS; row++)
{
    table[row] = new Array(COLUMNS);
    const tr = document.createElement("tr");
    for (let column = 0; column < COLUMNS; column++)
        tr.appendChild(document.createElement("td")).className = lights[row * ROWS + column] ? "on" : "off";
    game.appendChild(tr);
}

function clickLight(mouseEvent)
{
}