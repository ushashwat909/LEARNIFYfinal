class Marker {
    private static final int MOD = 10000003;
    
    // Check if it's possible to paint all boards with A painters in given time
    private boolean check(long mid, int A, int B, int[] C) {
        int cnt = 1; // number of painters used
        long time = (long) C[0] * B;
        
        for (int i = 1; i < C.length; i++) {
            long boardTime = (long) C[i] * B;
            if (time + boardTime <= mid) {
                time += boardTime;
            } else {
                cnt++;
                time = boardTime;
            }
        }
        
        return cnt <= A;
    }
    
    // Find minimum time required to paint all boards
    public int paint(int A, int B, int[] C) {
        // Find max and sum
        long max = 0;
        long sum = 0;
        for (int board : C) {
            max = Math.max(max, (long) board * B);
            sum += (long) board * B;
        }
        
        long lo = max;
        long hi = sum;
        long ans = 0;
        
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            if (check(mid, A, B, C)) {
                ans = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        
        return (int) (ans % MOD);
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int[] C, int output) {
        int expected = paint(A, B, C);
        return expected == output;
    }
}





