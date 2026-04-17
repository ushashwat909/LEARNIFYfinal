class Marker {
    // Calculate column-wise sums of a 2D matrix
    public int[] solve(int[][] A) {
        int n = A.length;
        int m = A[0].length;
        int[] ans = new int[m];
        
        // Iterate through each column
        for (int j = 0; j < m; j++) {
            int count = 0;
            // Sum all elements in column j
            for (int i = 0; i < n; i++) {
                count += A[i][j];
            }
            ans[j] = count;
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[][] A, int[] output) {
        int[] expected = solve(A);
        if (expected.length != output.length) {
            return false;
        }
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] != output[i]) {
                return false;
            }
        }
        return true;
    }
}

