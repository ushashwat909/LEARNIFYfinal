class Marker {
    // Find the length of the longest increasing subsequence
    public int lis(int[] A) {
        if (A == null || A.length == 0) {
            return 0;
        }
        
        int n = A.length;
        int[] lisLengths = new int[n];
        
        // Initialize all LIS lengths to 1 (each element is a subsequence of length 1)
        for (int i = 0; i < n; i++) {
            lisLengths[i] = 1;
        }
        
        // For each element, check all previous elements
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                // If current element is greater than previous element
                if (A[i] > A[j]) {
                    // Update LIS length if we can form a longer subsequence
                    lisLengths[i] = Math.max(lisLengths[i], lisLengths[j] + 1);
                }
            }
        }
        
        // Find the maximum LIS length
        int maxLis = lisLengths[0];
        for (int i = 1; i < n; i++) {
            maxLis = Math.max(maxLis, lisLengths[i]);
        }
        
        return maxLis;
    }
    
    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = lis(A);
        return expected == output;
    }
}


