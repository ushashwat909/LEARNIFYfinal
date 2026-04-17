import java.util.*;

class Marker {
    public List<List<Integer>> solve(int[][] A) {
        if (A.length == 0) {
            return new ArrayList<>();
        }
        
        int curSt = A[0][0];
        int curEnd = A[0][1];
        List<List<Integer>> ans = new ArrayList<>();
        
        for (int i = 1; i < A.length; i++) {
            if (A[i][0] > curEnd) {
                // No overlap, add current interval and start new one
                List<Integer> interval = new ArrayList<>();
                interval.add(curSt);
                interval.add(curEnd);
                ans.add(interval);
                curSt = A[i][0];
                curEnd = A[i][1];
            } else {
                // Overlap, merge by extending the end
                curEnd = Math.max(curEnd, A[i][1]);
            }
        }
        
        // Add the last interval
        List<Integer> lastInterval = new ArrayList<>();
        lastInterval.add(curSt);
        lastInterval.add(curEnd);
        ans.add(lastInterval);
        
        return ans;
    }

    public boolean isCorrect(int[][] A, List<List<Integer>> output) {
        List<List<Integer>> expected = solve(A);
        
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





