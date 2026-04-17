import java.util.*;

class Marker {
    public List<List<Integer>> generateMatrix(int A) {
        int n = A;
        List<List<Integer>> ans = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                row.add(0);
            }
            ans.add(row);
        }
        
        int i = 0;
        int j = 0;
        int cnt = 1;
        while (n > 1) {
            for (int k = 0; k < n - 1; k++) {
                ans.get(i).set(j, cnt);
                cnt++;
                j++;
            }

            for (int k = 0; k < n - 1; k++) {
                ans.get(i).set(j, cnt);
                cnt++;
                i++;
            }

            for (int k = 0; k < n - 1; k++) {
                ans.get(i).set(j, cnt);
                cnt++;
                j--;
            }

            for (int k = 0; k < n - 1; k++) {
                ans.get(i).set(j, cnt);
                cnt++;
                i--;
            }

            n -= 2;
            i++;
            j++;
        }

        if (n == 1) {
            ans.get(i).set(j, cnt);
        }
        return ans;
    }

    public boolean isCorrect(int A, List<List<Integer>> output) {
        List<List<Integer>> expected = generateMatrix(A);
        
        if (expected.size() != output.size()) {
            return false;
        }
        
        for (int i = 0; i < expected.size(); i++) {
            List<Integer> exp = expected.get(i);
            List<Integer> out = output.get(i);
            
            if (exp.size() != out.size()) {
                return false;
            }
            
            for (int j = 0; j < exp.size(); j++) {
                if (!exp.get(j).equals(out.get(j))) {
                    return false;
                }
            }
        }
        
        return true;
    }
}

