const input = document.getElementById('n-input');
const solveButton = document.getElementById('solve-button');
const message = document.getElementById('message');
const results = document.getElementById('results');
const pageSize = 12;
let currentResponse = null;
let currentPage = 1;

function setMessage(text, loading = false) {
  message.textContent = text;
  message.classList.toggle('loading', loading);
}

function createBoard(solution) {
  const board = document.createElement('div');
  const n = solution.length;
  board.className = 'board';
  board.setAttribute('role', 'img');
  board.setAttribute('aria-label', `Chess board with queens at ${solution.map((row, index) => `row ${index + 1}, column ${row.indexOf('Q') + 1}`).join('; ')}`);
  board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
  solution.forEach((row, rowIndex) => {
    [...row].forEach((value, columnIndex) => {
      const cell = document.createElement('div');
      cell.className = `cell ${value === 'Q' ? 'queen' : ''}`;
      cell.textContent = value === 'Q' ? 'Q' : '';
      cell.style.background = (rowIndex + columnIndex) % 2 === 0 ? 'var(--light-square)' : 'var(--dark-square)';
      cell.setAttribute('aria-hidden', 'true');
      board.appendChild(cell);
    });
  });
  return board;
}

function renderPage() {
  const response = currentResponse;
  results.replaceChildren();
  const summary = document.createElement('p');
  summary.className = 'summary';
  summary.textContent = `${response.solutionCount.toLocaleString()} solution${response.solutionCount === 1 ? '' : 's'} found`;
  if (response.solutionCount === 0) {
    const empty = document.createElement('p');
    empty.className = 'no-solutions';
    empty.textContent = `No solution exists for N = ${response.n}`;
    results.append(summary, empty);
    return;
  }
  const solutions = document.createElement('div');
  solutions.className = 'solutions';
  const start = (currentPage - 1) * pageSize;
  response.solutions.slice(start, start + pageSize).forEach((solution, index) => {
    const card = document.createElement('article');
    card.className = 'solution';
    const heading = document.createElement('h2');
    heading.textContent = `Solution ${start + index + 1}`;
    card.append(heading, createBoard(solution));
    solutions.appendChild(card);
  });
  const pageCount = Math.ceil(response.solutionCount / pageSize);
  const pagination = document.createElement('nav');
  pagination.className = 'pagination';
  pagination.setAttribute('aria-label', 'Solution pages');
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'page-button';
  previous.textContent = 'Previous';
  previous.disabled = currentPage === 1;
  previous.addEventListener('click', () => { currentPage -= 1; renderPage(); });
  const pageStatus = document.createElement('span');
  pageStatus.textContent = `Page ${currentPage} of ${pageCount}`;
  pageStatus.setAttribute('aria-live', 'polite');
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'page-button';
  next.textContent = 'Next';
  next.disabled = currentPage === pageCount;
  next.addEventListener('click', () => { currentPage += 1; renderPage(); });
  pagination.append(previous, pageStatus, next);
  results.append(summary, solutions, pagination);
}

function findSolutions(n) {
  const solutions = [];
  const columns = new Set();
  const leftDiagonals = new Set();
  const rightDiagonals = new Set();
  const queenColumns = Array(n).fill(-1);

  function place(row) {
    if (row === n) {
      solutions.push(queenColumns.map(queenColumn =>
        '.'.repeat(queenColumn) + 'Q' + '.'.repeat(n - queenColumn - 1)
      ));
      return;
    }

    for (let column = 0; column < n; column += 1) {
      const leftDiagonal = row - column;
      const rightDiagonal = row + column;
      if (columns.has(column) || leftDiagonals.has(leftDiagonal) || rightDiagonals.has(rightDiagonal)) {
        continue;
      }
      columns.add(column);
      leftDiagonals.add(leftDiagonal);
      rightDiagonals.add(rightDiagonal);
      queenColumns[row] = column;
      place(row + 1);
      columns.delete(column);
      leftDiagonals.delete(leftDiagonal);
      rightDiagonals.delete(rightDiagonal);
    }
  }

  place(0);
  return solutions;
}

async function solve() {
  const n = Number(input.value);
  if (!Number.isInteger(n) || n < 1 || n > 12) {
    results.replaceChildren();
    setMessage('Enter a whole number from 1 to 12.');
    input.focus();
    return;
  }
  solveButton.disabled = true;
  setMessage('Solving…', true);
  results.replaceChildren();
  try {
    await new Promise(resolve => setTimeout(resolve, 0));
    const solutions = findSolutions(n);
    const payload = { n, solutionCount: solutions.length, solutions };
    setMessage('');
    currentResponse = payload;
    currentPage = 1;
    renderPage();
  } catch (error) {
    setMessage(error.message || 'Something went wrong. Please try again.');
  } finally {
    solveButton.disabled = false;
  }
}

solveButton.addEventListener('click', solve);
input.addEventListener('keydown', event => { if (event.key === 'Enter') solve(); });
