import java.util.*;
class Marker {
    private static final long MOD = 1000000007L;
    
    // Returns the number of inversions in array A modulo 10^9+7
    public int solve(int[] A) {
        int[] arr = A.clone(); // Work with a copy to avoid modifying original
        return (int)(countInversion(arr, 0, arr.length - 1) % MOD);
    }
    
    private long countInversion(int[] A, int i, int j) {
        if (i >= j) {
            return 0;
        }
        int mid = (i + j) / 2;
        long a = countInversion(A, i, mid);
        long b = countInversion(A, mid + 1, j);
        long c = mergeCount(A, i, mid, j);
        return (a + b + c) % MOD;
    }
    
    private long mergeCount(int[] A, int i, int mid, int j) {
        // Create temporary arrays for left and right subarrays
        int[] B = Arrays.copyOfRange(A, i, mid + 1);
        int[] C = Arrays.copyOfRange(A, mid + 1, j + 1);
        
        int n = B.length;
        int m = C.length;
        int l = 0; // pointer for B
        int r = 0; // pointer for C
        int k = i; // pointer for A
        long cnt = 0;
        
        // Merge while both arrays have elements
        while (l < n && r < m) {
            if (B[l] > C[r]) {
                A[k] = C[r];
                cnt = (cnt + (n - l)) % MOD; // All remaining elements in B form inversions with C[r]
                r++;
            } else {
                A[k] = B[l];
                l++;
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
        
        return cnt;
    }

    // Compare the output with expected result
    public boolean isCorrect(int[] A, int output) {
        int expected = solve(A);
        return expected == output;
    }
}





