import java.util.*;

class Marker {
    public int[] solve(int[][] A) {
        List<Integer> ans = new ArrayList<>();
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        
        for (int i = 0; i < A.length; i++) {
            int p = A[i][0];
            int q = A[i][1];
            
            if (p == 1 && q == -1) {
                if (pq.isEmpty()) {
                    ans.add(-1);
                } else {
                    ans.add(pq.poll());
                }
            } else if (p == 2) {
                pq.offer(q);
            }
        }
        
        int[] result = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            result[i] = ans.get(i);
        }
        return result;
    }

    public boolean isCorrect(int[][] A, int[] output) {
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


