function clearline(i) {
    for (let j = 0; j < 10; j++) {
        board[i][j] = 0;
    }
    for (let j = i; j > 0; j--) {
        for (let k = 0; k < 10; k++) {
            board[j][k] = board[j - 1][k];
        }
    }
}

function checkline() {
    for (let i = 0; i < 20; i++) {
        let fullLine = true;
        for (let j = 0; j < 10; j++) {
            if (board[i][j] == 0) {
                fullLine = false;
                break;
            }
        }
        if (fullLine) {
            clearline(i);
        }
    }
}