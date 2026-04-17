class Marker {
    // Find maximum subarray sum that doesn't exceed B using sliding window
    public int solve(int A, int B, int[] C) {
        int l = 0;
        int ans = 0;
        long curSum = 0; // Use long to prevent overflow
        
        for (int r = 0; r < A; r++) {
            curSum += C[r];
            
            // Shrink window from left if sum exceeds B
            while (curSum > B && l <= r) {
                curSum -= C[l];
                l++;
            }
            
            // Update maximum valid sum
            ans = Math.max(ans, (int)curSum);
        }
        
        return ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int[] C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

