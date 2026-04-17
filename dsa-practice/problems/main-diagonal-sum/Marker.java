class Marker {
    // Calculate sum of main diagonal elements (where i == j)
    public int solve(int[][] A) {
        int n = A.length;
        int count = 0;
        
        // Iterate through the matrix and sum elements where i == j
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < A[i].length; j++) {
                if (i == j) {
                    count += A[i][j];
                }
            }
        }
        
        return count;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

