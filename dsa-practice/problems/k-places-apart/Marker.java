import java.util.*;

class Marker {
    public int[] solve(int[] A, int B) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        List<Integer> result = new ArrayList<>();
        
        // Add the first B+1 elements to the min-heap
        for (int i = 0; i < Math.min(B + 1, A.length); i++) {
            minHeap.offer(A[i]);
        }
        
        // Process the remaining elements in A
        for (int i = B + 1; i < A.length; i++) {
            result.add(minHeap.poll());  // Extract the minimum element
            minHeap.offer(A[i]);         // Push the next element into the heap
        }
        
        // Extract all remaining elements from the min-heap
        while (!minHeap.isEmpty()) {
            result.add(minHeap.poll());
        }
        
        int[] resultArray = new int[result.size()];
        for (int i = 0; i < result.size(); i++) {
            resultArray[i] = result.get(i);
        }
        return resultArray;
    }

    public boolean isCorrect(int[] A, int B, int[] output) {
        int[] expected = solve(A, B);
        
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


