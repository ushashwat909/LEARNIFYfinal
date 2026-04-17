import java.util.*;

class Marker {
    // Count divisors of each element in array A
    public int[] solve(int[] A) {
        // Find maximum element to build SPF array
        int maxVal = 0;
        for (int num : A) {
            maxVal = Math.max(maxVal, num);
        }
        
        // Create Smallest Prime Factor (SPF) array
        int[] spf = new int[maxVal + 1];
        for (int i = 0; i <= maxVal; i++) {
            spf[i] = i;
        }
        
        // Build SPF array using Sieve of Eratosthenes
        for (int i = 2; i * i <= maxVal; i++) {
            if (spf[i] == i) {
                for (int j = 2 * i; j <= maxVal; j += i) {
                    if (spf[j] == j) {
                        spf[j] = i;
                    }
                }
            }
        }
        
        // Calculate count of divisors for each element
        int[] result = new int[A.length];
        for (int idx = 0; idx < A.length; idx++) {
            int n = A[idx];
            int count = 1;
            
            // Factorize using SPF
            while (n != 1) {
                int p = spf[n];
                int cnt = 0;
                while (n % p == 0) {
                    cnt++;
                    n /= p;
                }
                count *= (cnt + 1);
            }
            
            result[idx] = count;
        }
        
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        int[] expected = solve(A);
        
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

