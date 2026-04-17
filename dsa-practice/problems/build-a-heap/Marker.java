import java.util.*;

class Marker {
    private void downHeapify(int[] A, int idx, int n) {
        while (2 * idx + 1 < n) {
            int minIdx = idx;
            int leftChild = 2 * idx + 1;
            int rightChild = 2 * idx + 2;
            
            if (A[leftChild] < A[minIdx]) {
                minIdx = leftChild;
            }
            
            if (rightChild < n && A[rightChild] < A[minIdx]) {
                minIdx = rightChild;
            }
            
            if (minIdx == idx) {
                break;
            }
            
            // Swap
            int temp = A[idx];
            A[idx] = A[minIdx];
            A[minIdx] = temp;
            
            idx = minIdx;
        }
    }
    
    public int[] build_heap(int[] A) {
        int n = A.length;
        // Create a copy to avoid modifying the original
        int[] heap = A.clone();
        
        // Start from the last parent node and work backwards
        for (int i = n / 2 - 1; i >= 0; i--) {
            downHeapify(heap, i, n);
        }
        
        return heap;
    }
    
    private boolean isValidMinHeap(int[] A) {
        int n = A.length;
        for (int i = 0; i < n; i++) {
            int leftChild = 2 * i + 1;
            int rightChild = 2 * i + 2;
            
            if (leftChild < n && A[i] > A[leftChild]) {
                return false;
            }
            if (rightChild < n && A[i] > A[rightChild]) {
                return false;
            }
        }
        return true;
    }
    
    private boolean arraysContainSameElements(int[] A, int[] B) {
        if (A.length != B.length) {
            return false;
        }
        
        int[] sortedA = A.clone();
        int[] sortedB = B.clone();
        Arrays.sort(sortedA);
        Arrays.sort(sortedB);
        
        for (int i = 0; i < sortedA.length; i++) {
            if (sortedA[i] != sortedB[i]) {
                return false;
            }
        }
        return true;
    }
    
    public boolean isCorrect(int[] A, int[] output) {
        // Check if output is a valid min heap
        if (!isValidMinHeap(output)) {
            return false;
        }
        
        // Check if output contains the same elements as input
        if (!arraysContainSameElements(A, output)) {
            return false;
        }
        
        return true;
    }
}


