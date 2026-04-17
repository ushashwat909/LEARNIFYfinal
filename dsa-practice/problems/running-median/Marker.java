import java.util.*;

class Marker {
    public int[] solve(int[] A) {
        List<Integer> ans = new ArrayList<>();
        // Max heap for smaller half (using negative values since PriorityQueue is min heap)
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        // Min heap for larger half
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int x : A) {
            if (maxHeap.isEmpty() || x < maxHeap.peek()) {
                maxHeap.offer(x);
                // Balance: if max heap has more than 1 element than min heap, move to min heap
                if (maxHeap.size() - minHeap.size() > 1) {
                    minHeap.offer(maxHeap.poll());
                }
            } else {
                minHeap.offer(x);
                // Balance: if min heap has more than 1 element than max heap, move to max heap
                if (minHeap.size() - maxHeap.size() > 1) {
                    maxHeap.offer(minHeap.poll());
                }
            }
            
            // Determine median based on heap sizes
            if (minHeap.size() > maxHeap.size()) {
                ans.add(minHeap.peek());
            } else {
                ans.add(maxHeap.peek());
            }
        }
        
        int[] result = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }
        return result;
    }

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


