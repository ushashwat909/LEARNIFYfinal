import java.util.*;

class Marker {
    public List<List<Integer>> insert(int[][] A, int[] B) {
        List<List<Integer>> ans = new ArrayList<>();
        int[] I = new int[]{B[0], B[1]};
        
        for (int i = 0; i < A.length; i++) {
            if (A[i][1] < I[0]) {
                // Current interval ends before new interval starts - add it
                List<Integer> interval = new ArrayList<>();
                interval.add(A[i][0]);
                interval.add(A[i][1]);
                ans.add(interval);
            } else if (A[i][0] > I[1]) {
                // Current interval starts after new interval ends - add new interval and remaining
                List<Integer> newInterval = new ArrayList<>();
                newInterval.add(I[0]);
                newInterval.add(I[1]);
                ans.add(newInterval);
                
                for (int k = i; k < A.length; k++) {
                    List<Integer> interval = new ArrayList<>();
                    interval.add(A[k][0]);
                    interval.add(A[k][1]);
                    ans.add(interval);
                }
                return ans;
            } else {
                // Overlap - merge by updating the new interval
                I[0] = Math.min(I[0], A[i][0]);
                I[1] = Math.max(I[1], A[i][1]);
            }
        }
        
        // Add the new interval if it hasn't been added yet
        List<Integer> finalInterval = new ArrayList<>();
        finalInterval.add(I[0]);
        finalInterval.add(I[1]);
        ans.add(finalInterval);
        
        return ans;
    }

    public boolean isCorrect(int[][] A, int[] B, List<List<Integer>> output) {
        List<List<Integer>> expected = insert(A, B);
        
        if (expected.size() != output.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            List<Integer> exp = expected.get(i);
            List<Integer> out = output.get(i);
            
            if (exp.size() != out.size() || exp.size() != 2) {
                return false;
            }
            
            if (!exp.get(0).equals(out.get(0)) || !exp.get(1).equals(out.get(1))) {
                return false;
            }
        }
        
        return true;
    }
}





