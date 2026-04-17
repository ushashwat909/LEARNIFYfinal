import java.util.*;

class Marker {
    // Factorize a number into prime factors
    private Map<Integer, Integer> factorize(int n) {
        Map<Integer, Integer> factors = new HashMap<>();
        int i = 2;
        while (i * i <= n) {
            while (n % i == 0) {
                n /= i;
                factors.put(i, factors.getOrDefault(i, 0) + 1);
            }
            i++;
        }
        if (n > 1) {
            factors.put(n, factors.getOrDefault(n, 0) + 1);
        }
        return factors;
    }

    // Multiply factors using modular exponentiation
    private long multiplyFactors(Map<Integer, Integer> factors, int m) {
        long result = 1;
        for (Map.Entry<Integer, Integer> entry : factors.entrySet()) {
            int base = entry.getKey();
            int exp = entry.getValue();
            result = (result * modPow(base, exp, m)) % m;
        }
        return result;
    }

    // Modular exponentiation: (base^exp) % m
    private long modPow(long base, int exp, int m) {
        long result = 1;
        base = base % m;
        while (exp > 0) {
            if (exp % 2 == 1) {
                result = (result * base) % m;
            }
            exp /= 2;
            base = (base * base) % m;
        }
        return result;
    }

    // Compute nCr % m
    public int solve(int A, int B, int C) {
        int n = A;
        int r = B;
        int m = C;

        if (r > n) {
            return 0;
        }
        if (r == 0 || r == n) {
            return 1 % m;
        }
        
        r = Math.min(r, n - r);
        Map<Integer, Integer> numeratorFactors = new HashMap<>();
        Map<Integer, Integer> denominatorFactors = new HashMap<>();

        // Factorize numerator terms (n, n-1, ..., n-r+1)
        for (int i = n; i > n - r; i--) {
            Map<Integer, Integer> factors = factorize(i);
            for (Map.Entry<Integer, Integer> entry : factors.entrySet()) {
                int base = entry.getKey();
                int exp = entry.getValue();
                numeratorFactors.put(base, numeratorFactors.getOrDefault(base, 0) + exp);
            }
        }

        // Factorize denominator terms (1, 2, ..., r)
        for (int i = 1; i <= r; i++) {
            Map<Integer, Integer> factors = factorize(i);
            for (Map.Entry<Integer, Integer> entry : factors.entrySet()) {
                int base = entry.getKey();
                int exp = entry.getValue();
                denominatorFactors.put(base, denominatorFactors.getOrDefault(base, 0) + exp);
            }
        }

        // Subtract exponents
        for (Map.Entry<Integer, Integer> entry : denominatorFactors.entrySet()) {
            int base = entry.getKey();
            int exp = entry.getValue();
            numeratorFactors.put(base, numeratorFactors.getOrDefault(base, 0) - exp);
        }

        // Remove zero or negative exponents
        Map<Integer, Integer> finalFactors = new HashMap<>();
        for (Map.Entry<Integer, Integer> entry : numeratorFactors.entrySet()) {
            if (entry.getValue() > 0) {
                finalFactors.put(entry.getKey(), entry.getValue());
            }
        }

        long result = multiplyFactors(finalFactors, m);
        return (int)(result % m);
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, int B, int C, int output) {
        int expected = solve(A, B, C);
        return expected == output;
    }
}

