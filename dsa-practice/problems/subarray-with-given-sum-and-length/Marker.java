class Marker {
    // Check if there exists a subarray of length B with sum C using fixed sliding window
    public int solve(int[] A, int B, int C) {
        int n = A.length;
        long fws = 0; // Fixed window sum - use long to prevent overflow
        
        // Calculate sum of first window of size B
        for (int i = 0; i < B; i++) {
            fws += A[i];
        }
        
        // Check first window
        if (fws == C) {
            return 1;
        }
        
        // Slide the window
        int s = 1; // start index
        int e = B; // end index
        
        while (e < n) {
            // Remove leftmost element and add rightmost element
            fws = fws - A[s - 1] + A[e];
            
            if (fws == C) {
                return 1;
            }
            
            s++;
            e++;
        }
        
        return 0;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

