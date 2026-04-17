class Marker {
    public int firstMissingPositive(int[] A) {
        int n = A.length;

        // Replace all non-positive numbers with n+2
        for (int i = 0; i < n; i++) {
            if (A[i] <= 0) {
                A[i] = n + 2;
            }
        }

        // Mark presence of numbers by making values negative
        for (int i = 0; i < n; i++) {
            int ele = Math.abs(A[i]);
            int idx = ele - 1;
            if (idx >= 0 && idx < n) {
                A[idx] = -Math.abs(A[idx]);
            }
        }

        // Find first positive value
        for (int i = 0; i < n; i++) {
            if (A[i] > 0) {
                return i + 1;
            }
        }
        return n + 1;
    }

    public boolean isCorrect(int[] A, int output) {
        // Create a copy to avoid modifying the original
        int[] copy = new int[A.length];
        System.arraycopy(A, 0, copy, 0, A.length);
        int expected = firstMissingPositive(copy);
        return expected == output;
    }
}

