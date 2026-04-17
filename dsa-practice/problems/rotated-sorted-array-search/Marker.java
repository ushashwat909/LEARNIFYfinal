class Marker {
    // Search for target B in rotated sorted array A
    public int search(int[] A, int B) {
        int n = A.length;
        int lo = 0;
        int hi = n - 1;
        
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            
            if (A[mid] == B) {
                return mid;
            }
            
            // Check if left half is sorted (A[mid] >= A[0])
            if (A[mid] >= A[0]) {
                // Check if target is in the sorted left half
                if (A[0] <= B && B < A[mid]) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            } else {
                // Right half is sorted
                // Check if target is in the sorted right half
                if (A[mid] < B && B <= A[n - 1]) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        
        return -1;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = search(A, B);
        return expected == output;
    }
}





