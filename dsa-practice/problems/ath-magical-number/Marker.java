class Marker {
    private static final int MOD = 1000000007;
    
    // Find the Ath smallest magical number (divisible by B or C)
    public int solve(int A, int B, int C) {
        long lo = 0;
        long hi = (long) Math.min(B, C) * A;
        long ans = 0;
        
        while (lo <= hi) {
            long mid = (lo + hi) / 2;
            long factors = mid / B + mid / C - mid / lcm(B, C);
            
            if (factors == A) {
                ans = mid;
                ans = ans % MOD;
                hi = mid - 1; // Try to find smaller answer
            } else if (factors < A) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        
        return (int) ans;
    }
    
    // Calculate GCD using Euclidean algorithm
    private long gcd(long a, long b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }
    
    // Calculate LCM
    private long lcm(long a, long b) {
        return (a * b) / gcd(a, b);
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}





