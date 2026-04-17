import java.util.*;
class Marker {
    // Returns a 2D list of moves to solve Tower of Hanoi
    public List<List<Integer>> towerOfHanoi(int A) {
        List<List<Integer>> moves = new ArrayList<>();
        toh(1, 2, 3, A, moves);
        return moves;
    }
    
    private void toh(int a, int b, int c, int n, List<List<Integer>> moves) {
        if (n == 1) {
            List<Integer> move = new ArrayList<>();
            move.add(1);
            move.add(a);
            move.add(c);
            moves.add(move);
            return;
        }
        // Move top n-1 disks from source (a) to auxiliary (b) using destination (c) as auxiliary
        toh(a, c, b, n - 1, moves);
        // Move the largest disk n from source (a) to destination (c)
        List<Integer> move = new ArrayList<>();
        move.add(n);
        move.add(a);
        move.add(c);
        moves.add(move);
        // Move the n-1 disks from auxiliary (b) to destination (c) using source (a) as auxiliary
        toh(b, a, c, n - 1, moves);
    }

    // Compare the output with expected result
    public boolean isCorrect(int A, List<List<Integer>> output) {
        List<List<Integer>> expected = towerOfHanoi(A);
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





