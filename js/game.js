// ============================================================
// НАСТРОЙКИ ИГРЫ "ТРИ В РЯД"
// ============================================================

export const BOARD_SIZE = 6;
export const TILE_TYPES = ['💻', '⚡', '🔌', '☁️', '🌐', '📡'];

// ============================================================
// ГЕНЕРАЦИЯ ПОЛЯ БЕЗ ГОТОВЫХ МАТЧЕЙ
// ============================================================

export function generateValidBoard() {
    let board = new Array(BOARD_SIZE * BOARD_SIZE);
    
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const idx = r * BOARD_SIZE + c;
            let validTypes = [...TILE_TYPES];
            
            // Исключаем тип, который создаст горизонтальный матч (3 в ряд)
            if (c >= 2) {
                const left1 = board[idx - 1];
                const left2 = board[idx - 2];
                if (left1 === left2) {
                    validTypes = validTypes.filter(t => t !== left1);
                }
            }
            
            // Исключаем тип, который создаст вертикальный матч (3 в ряд)
            if (r >= 2) {
                const up1 = board[idx - BOARD_SIZE];
                const up2 = board[idx - BOARD_SIZE * 2];
                if (up1 === up2) {
                    validTypes = validTypes.filter(t => t !== up1);
                }
            }
            
            // Берем случайный тип из оставшихся безопасных
            board[idx] = validTypes[Math.floor(Math.random() * validTypes.length)];
        }
    }
    return board;
}

// ============================================================
// ПОИСК СОВПАДЕНИЙ
// ============================================================

export function checkMatches(board) {
    const matches = new Set();

    // Горизонтальные (3 в ряд)
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE - 2; c++) {
            const idx = r * BOARD_SIZE + c;
            const t1 = board[idx];
            const t2 = board[idx + 1];
            const t3 = board[idx + 2];
            if (t1 && t1 === t2 && t1 === t3) {
                matches.add(idx);
                matches.add(idx + 1);
                matches.add(idx + 2);
            }
        }
    }

    // Вертикальные (3 в ряд)
    for (let c = 0; c < BOARD_SIZE; c++) {
        for (let r = 0; r < BOARD_SIZE - 2; r++) {
            const idx = r * BOARD_SIZE + c;
            const t1 = board[idx];
            const t2 = board[idx + BOARD_SIZE];
            const t3 = board[idx + BOARD_SIZE * 2];
            if (t1 && t1 === t2 && t1 === t3) {
                matches.add(idx);
                matches.add(idx + BOARD_SIZE);
                matches.add(idx + BOARD_SIZE * 2);
            }
        }
    }

    return Array.from(matches);
}

/**
 * Проверяет, есть ли на поле хоть одно совпадение
 */
export function hasMatches(board) {
    return checkMatches(board).length > 0;
}

/**
 * Проверяет, есть ли на поле возможные ходы
 */
export function hasValidMoves(board) {
    // Проходим по всем плиткам
    for (let i = 0; i < board.length; i++) {
        for (let j = i + 1; j < board.length; j++) {
            if (areNeighbors(i, j)) {
                // Пробуем поменять местами
                swapTilesInBoard(board, i, j);
                
                const matches = checkMatches(board);
                
                // Возвращаем обратно
                swapTilesInBoard(board, i, j);
                
                if (matches.length > 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

// ============================================================
// ПРОВЕРКА СОСЕДСТВА
// ============================================================

export function areNeighbors(idx1, idx2) {
    const r1 = Math.floor(idx1 / BOARD_SIZE);
    const c1 = idx1 % BOARD_SIZE;
    const r2 = Math.floor(idx2 / BOARD_SIZE);
    const c2 = idx2 % BOARD_SIZE;
    return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
}

// ============================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

/**
 * Меняет местами две плитки в массиве (без копирования)
 */
function swapTilesInBoard(board, idx1, idx2) {
    const temp = board[idx1];
    board[idx1] = board[idx2];
    board[idx2] = temp;
}

/**
 * Создаёт копию доски (для проверок)
 */
export function copyBoard(board) {
    return [...board];
}

/**
 * Проверяет, заполнена ли доска
 */
export function isBoardFull(board) {
    return board.every(tile => tile !== null);
}

/**
 * Получает количество пустых ячеек
 */
export function getEmptyCount(board) {
    return board.filter(tile => tile === null).length;
}

/**
 * Получает соседей плитки (индексы)
 */
export function getNeighbors(index) {
    const r = Math.floor(index / BOARD_SIZE);
    const c = index % BOARD_SIZE;
    const neighbors = [];
    
    if (r > 0) neighbors.push(index - BOARD_SIZE);
    if (r < BOARD_SIZE - 1) neighbors.push(index + BOARD_SIZE);
    if (c > 0) neighbors.push(index - 1);
    if (c < BOARD_SIZE - 1) neighbors.push(index + 1);
    
    return neighbors;
}

/**
 * Проверяет, можно ли обменять две плитки (дают ли они матч)
 */
export function canSwap(board, idx1, idx2) {
    if (!areNeighbors(idx1, idx2)) return false;
    
    const testBoard = [...board];
    swapTilesInBoard(testBoard, idx1, idx2);
    
    return checkMatches(testBoard).length > 0;
}

// ============================================================
// АНАЛИЗ ДОСКИ (ДЛЯ БОТА ИЛИ ПОДСКАЗОК)
// ============================================================

/**
 * Находит все возможные обмены, которые дают матч
 */
export function findAllValidSwaps(board) {
    const swaps = [];
    
    for (let i = 0; i < board.length; i++) {
        for (let j = i + 1; j < board.length; j++) {
            if (areNeighbors(i, j) && canSwap(board, i, j)) {
                swaps.push([i, j]);
            }
        }
    }
    
    return swaps;
}

/**
 * Получает лучший обмен (с максимальным количеством совпадений)
 */
export function findBestSwap(board) {
    const swaps = findAllValidSwaps(board);
    let bestSwap = null;
    let bestCount = 0;
    
    for (const [i, j] of swaps) {
        const testBoard = [...board];
        swapTilesInBoard(testBoard, i, j);
        const matches = checkMatches(testBoard);
        
        if (matches.length > bestCount) {
            bestCount = matches.length;
            bestSwap = [i, j];
        }
    }
    
    return bestSwap;
}