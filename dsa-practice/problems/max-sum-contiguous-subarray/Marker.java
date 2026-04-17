class Marker {
    // Find maximum sum contiguous subarray using Kadane's algorithm
    public int solve(int[] A) {
        int ans = Integer.MIN_VALUE;
        int curSum = 0;
        
        for (int i = 0; i < A.length; i++) {
            curSum += A[i];
            ans = Math.max(ans, curSum);
            
            // If current sum becomes negative, reset to 0
            // (start a new subarray from next element)
            if (curSum < 0) {
                curSum = 0;
            }
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}

