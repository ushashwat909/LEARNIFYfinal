import java.util.*;
class Marker {
    // Sorts array A using Merge Sort
    public int[] solve(int[] A) {
        int[] arr = A.clone(); // Work with a copy to avoid modifying original
        mergeSort(arr, 0, arr.length - 1);
        return arr;
    }
    
    private void mergeSort(int[] A, int i, int j) {
        if (i >= j) {
            return;
        }
        int mid = (i + j) / 2;
        mergeSort(A, i, mid);
        mergeSort(A, mid + 1, j);
        merge(A, i, mid, j);
    }
    
    private void merge(int[] A, int i, int mid, int j) {
        // Create temporary arrays for left and right subarrays
        int[] B = Arrays.copyOfRange(A, i, mid + 1);
        int[] C = Arrays.copyOfRange(A, mid + 1, j + 1);
        
        int l = 0; // pointer for B
        int r = 0; // pointer for C
        int k = i; // pointer for A
        
        int n = B.length;
        int m = C.length;
        
        // Merge while both arrays have elements
        while (l < n && r < m) {
            if (B[l] < C[r]) {
                A[k] = B[l];
                l++;
            } else {
                A[k] = C[r];
                r++;
            }
            k++;
        }
        
        // Add remaining elements from B
        while (l < n) {
            A[k] = B[l];
            l++;
            k++;
        }
        
        // Add remaining elements from C
        while (r < m) {
            A[k] = C[r];
            r++;
            k++;
        }
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





