const ROWS = 3; //橫列
const COLUMNS = 3; //直行
const LIGHTS = 5; //要亮的格數

const game = document.getElementById("game"); //主棋盤
document.documentElement.style.setProperty('--table-width', 6 * COLUMNS + "em"); //定義table的CSS寬度
const table = new Array(ROWS);

const lights = createLightsArray(); //二維陣列 正在亮著的格子

for (let row = 0; row < ROWS; row++)
{
	table[row] = new Array(COLUMNS);
	const tr = document.createElement("tr");
	for (let column = 0; column < COLUMNS; column++)
	{
		const td = document.createElement("td");
		td.className = lights[row][column] ? "on" : "off";
		const finalRow = row;
		const finalColumn = column;
		td.addEventListener("click", () => cellClick(finalRow, finalColumn));
		tr.appendChild(td);
		table[row][column] = td;
	}
	game.appendChild(tr);
}

function createLightsArray()
{
	const ELEMENTS = ROWS * COLUMNS; //總數
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
	
	const lights = new Array(ROWS); //要被點亮的陣列
	for (let row = 0; row < ROWS; row++)
	{
		lights[row] = new Array(COLUMNS);
		lights[row].fill(false);
	}
	for (let index = 0; index < LIGHTS; index++)
	{
		const row = Math.trunc(randomArray[index] / ROWS);
		const column = Math.trunc(randomArray[index] % ROWS);
		lights[row][column] = true; //根據洗牌的結果決定要亮的格子
	}

	return lights;
}

function cellClick(row, column)
{
	swapStatus(row - 1, column);
	swapStatus(row + 1, column);
	swapStatus(row, column);
	swapStatus(row, column - 1);
	swapStatus(row, column + 1);
}

function swapStatus(row, column)
{
	if (0 <= row && row < ROWS && 0 <= column && column < COLUMNS)
		table[row][column].className = (lights[row][column] = !lights[row][column]) ? "on" : "off";
}