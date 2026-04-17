class Marker {
    // Find floor of square root of A
    public int sqrt(int A) {
        if (A == 0) {
            return 0;
        }
        
        long lo = 0;
        long hi = A;
        long ans = 0;
        
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long square = mid * mid;
            
            if (square <= A) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        
        return (int) ans;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int output) {
        int expected = sqrt(A);
        return expected == output;
    }
}





