class Marker {
    // Find leftmost and rightmost index of B in sorted array A
    public int[] searchRange(int[] A, int B) {
        int lo = 0;
        int hi = A.length - 1;
        int fo = -1; // first occurrence
        
        // Find leftmost occurrence
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (A[mid] == B) {
                fo = mid;
                hi = mid - 1; // Continue searching left
            } else if (A[mid] < B) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        
        // If not found, return [-1, -1]
        if (fo == -1) {
            return new int[]{-1, -1};
        }
        
        // Find rightmost occurrence
        lo = 0;
        hi = A.length - 1;
        int loc = -1; // last occurrence
        
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (A[mid] == B) {
                loc = mid;
                lo = mid + 1; // Continue searching right
            } else if (A[mid] < B) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        
        return new int[]{fo, loc};
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int[] output) {
        int[] expected = searchRange(A, B);
        
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





