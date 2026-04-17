import java.util.*;

class Marker {
    public int[] solve(int A, int[] B) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        List<Integer> ans = new ArrayList<>();
        
        for (int x : B) {
            pq.offer(x);
            
            // If heap size exceeds A, remove the smallest element
            if (pq.size() > A) {
                pq.poll();
            }
            
            // If we have less than A elements, output -1
            if (pq.size() < A) {
                ans.add(-1);
            } else {
                // The root of min heap is the Ath largest element
                ans.add(pq.peek());
            }
        }
        
        int[] result = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }
        return result;
    }

    public boolean isCorrect(int A, int[] B, int[] output) {
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


