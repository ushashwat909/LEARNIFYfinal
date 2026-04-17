import java.util.*;

class Marker {
    // Find all prime numbers in the range [1, A] using Sieve of Eratosthenes
    public int[] solve(int A) {
        if (A < 2) {
            return new int[0];
        }
        
        boolean[] isPrime = new boolean[A + 1];
        Arrays.fill(isPrime, true);
        isPrime[0] = false;
        isPrime[1] = false;
        
        // Sieve of Eratosthenes
        int sqrtA = (int) Math.sqrt(A);
        for (int i = 2; i <= sqrtA; i++) {
            if (isPrime[i]) {
                for (int j = 2 * i; j <= A; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        
        // Collect all primes
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= A; i++) {
            if (isPrime[i]) {
                primes.add(i);
            }
        }
        
        // Convert to array
        int[] result = new int[primes.size()];
        for (int i = 0; i < primes.size(); i++) {
            result[i] = primes.get(i);
        }
        
        return result;
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int[] output) {
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

