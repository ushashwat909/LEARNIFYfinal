class Marker {
    // Find and return the peak element in the array
    public int solve(int[] A) {
        if (A.length == 0) {
            return 0; // Should not happen based on constraints
        }
        if (A.length == 1) {
            return A[0];
        }
        
        int n = A.length;
        
        // Check left corner
        if (A[0] > A[1]) {
            return A[0];
        }
        
        // Check right corner
        if (A[n - 1] > A[n - 2]) {
            return A[n - 1];
        }
        
        // Binary search for peak in middle elements
        int lo = 1;
        int hi = n - 2;
        
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            
            if (A[mid] >= A[mid - 1] && A[mid] >= A[mid + 1]) {
                return A[mid];
            } else if (A[mid] > A[mid - 1]) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        
        // Should not reach here, but return a value
        return A[0];
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





