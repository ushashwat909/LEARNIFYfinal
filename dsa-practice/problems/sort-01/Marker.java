class Marker {
    // Sort array of 0s and 1s using two pointers
    public int[] sort01(int[] A) {
        int n = A.length;
        int i = 0;
        int j = n - 1;
        
        while (i <= j) {
            if (A[i] == 0) {
                i++;
            } else if (A[j] == 1) {
                j--;
            } else {
                // Swap A[i] and A[j]
                int temp = A[i];
                A[i] = A[j];
                A[j] = temp;
                i++;
                j--;
            }
        }
        
        return A;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        int[] expected = sort01(A.clone());
        
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





