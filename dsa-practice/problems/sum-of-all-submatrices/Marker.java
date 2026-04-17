class Marker {
    public int solve(int[][] A) {
        int ans = 0;
        int n = A.length;
        int m = A[0].length;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                ans += A[i][j] * (i + 1) * (j + 1) * (n - i) * (m - j);
            }
        }
        return ans;
    }

    public boolean isCorrect(int[][] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

