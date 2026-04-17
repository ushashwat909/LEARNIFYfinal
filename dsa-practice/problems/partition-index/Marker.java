class Marker {
    // Partition array using last element as pivot, return partition index
    public int partition(int[] A) {
        int n = A.length;
        int i = 0;
        int j = n - 2;
        int pivot = A[n - 1];
        
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
        
        // Swap pivot with A[i]
        A[n - 1] = A[i];
        A[i] = pivot;
        
        return i;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        // Get the original pivot value (last element before modification)
        // Note: A might be modified by user's solution, so we need to reconstruct original
        // Actually, A passed here should be the original array before user's solution ran
        int n = A.length;
        if (n == 0) {
            return output == 0;
        }
        
        // Clone array to compute expected partition
        int[] A_clone = A.clone();
        int expected = partition(A_clone);
        
        // Check if output index matches expected
        if (expected != output) {
            return false;
        }
        
        // Verify partition correctness on the expected result
        int pivot = A[n - 1]; // Original pivot value (last element)
        
        // Check that all elements before output index are < pivot
        for (int i = 0; i < output; i++) {
            if (A_clone[i] >= pivot) {
                return false;
            }
        }
        
        // Check that element at output index is the pivot
        if (A_clone[output] != pivot) {
            return false;
        }
        
        // Check that all elements after output index are > pivot
        for (int i = output + 1; i < n; i++) {
            if (A_clone[i] <= pivot) {
                return false;
            }
        }
        
        return true;
    }
}

