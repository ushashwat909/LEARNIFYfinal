class Marker {
    private static final int MOD = 1000003;

    // Count characters smaller than A[index] to the right of index
    private int countSmallerRight(String s, int index) {
        int count = 0;
        int n = s.length();
        for (int j = index + 1; j < n; j++) {
            if (s.charAt(j) < s.charAt(index)) {
                count++;
            }
        }
        return count;
    }

    // Find the rank of string A in lexicographically sorted permutations
    public int findRank(String A) {
        int n = A.length();

        // Precompute factorials modulo MOD
        long[] factorial = new long[n + 1];
        factorial[0] = 1;
        factorial[1] = 1;
        for (int i = 2; i <= n; i++) {
            factorial[i] = (factorial[i - 1] * i) % MOD;
        }

        long rank = 1;
        for (int i = 0; i < n; i++) {
            int count = countSmallerRight(A, i);
            rank = (rank + (count * factorial[n - i - 1]) % MOD) % MOD;
        }

        return (int) rank;
    }

    // Compare the output with expected result
    public boolean isCorrect(String A, int output) {
        int expected = findRank(A);
        return expected == output;
    }
}

