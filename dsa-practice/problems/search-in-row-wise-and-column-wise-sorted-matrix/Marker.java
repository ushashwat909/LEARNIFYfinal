class Marker {
    public int solve(int[][] A, int B) {
        int n = A.length;
        int m = A[0].length;
        int i = 0;
        int j = m - 1;
        
        while (i < n && j >= 0) {
            if (A[i][j] == B) {
                // Find the leftmost occurrence in this row
                for (int k = 0; k <= j; k++) {
                    if (A[i][k] == B) {
                        return (i + 1) * 1009 + (k + 1);
                    }
                }
            } else if (A[i][j] < B) {
                i++;
            } else {
                j--;
            }
        }
        return -1;
    }

    public boolean isCorrect(int[][] A, int B, int output) {
        int expected = solve(A, B);
        return expected == output;
    }
}

