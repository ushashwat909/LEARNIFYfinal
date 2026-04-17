class Marker {
    // Sort array using Quick Sort
    public int[] solve(int[] A) {
        quickSort(A, 0, A.length - 1);
        return A;
    }
    
    private void quickSort(int[] A, int l, int r) {
        if (l >= r) {
            return;
        }
        int p = partition(A, l, r);
        quickSort(A, l, p - 1);
        quickSort(A, p + 1, r);
    }
    
    private int partition(int[] A, int l, int r) {
        int pivot = A[l];
        int i = l + 1;
        int j = r;
        
        while (i <= j) {
            if (A[i] < pivot) {
                i++;
            } else if (A[j] > pivot) {
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
        
        // Swap pivot with A[j]
        A[l] = A[j];
        A[j] = pivot;
        
        return j;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int[] output) {
        // Clone array to avoid modifying original
        int[] A_clone = A.clone();
        int[] expected = solve(A_clone);
        
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





