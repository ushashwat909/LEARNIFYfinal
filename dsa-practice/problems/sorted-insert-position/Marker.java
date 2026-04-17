class Marker {
    // Find the index where target B should be inserted in sorted array A
    public int searchInsert(int[] A, int B) {
        int lo = 0;
        int hi = A.length - 1;
        
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (A[mid] == B) {
                return mid;
            } else if (A[mid] < B) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        
        return lo;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int B, int output) {
        int expected = searchInsert(A, B);
        return expected == output;
    }
}





