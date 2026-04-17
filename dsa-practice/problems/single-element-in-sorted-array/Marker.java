class Marker {
    // Find the single element in sorted array where all other elements appear twice
    public int solve(int[] A) {
        int n = A.length;
        
        if (n == 0) {
            return 0; // Should not happen based on constraints
        }
        if (n == 1) {
            return A[0];
        }
        
        // Check first element
        if (A[0] != A[1]) {
            return A[0];
        }
        
        // Check last element
        if (A[n - 1] != A[n - 2]) {
            return A[n - 1];
        }
        
        int lo = 0;
        int hi = n - 1;
        
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            
            // Check if mid is the single element
            if (A[mid] != A[mid - 1] && A[mid] != A[mid + 1]) {
                return A[mid];
            } else if (A[mid] != A[mid - 1]) {
                // A[mid] == A[mid + 1]
                if (mid % 2 == 0) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            } else {
                // A[mid] == A[mid - 1]
                if (mid % 2 == 0) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
        }
        
        return -1; // Should not reach here
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





