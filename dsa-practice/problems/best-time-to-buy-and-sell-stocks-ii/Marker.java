class Marker {
    // Find maximum profit using greedy approach
    public int maxProfit(int[] A) {
        if (A == null || A.length < 2) {
            return 0; // No transactions possible
        }
        
        int maxProfit = 0;
        for (int i = 1; i < A.length; i++) {
            if (A[i] > A[i - 1]) {
                maxProfit += A[i] - A[i - 1];
            }
        }
        
        return maxProfit;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = maxProfit(A);
        return expected == output;
    }
}

