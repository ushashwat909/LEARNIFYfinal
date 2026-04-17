# Generate Subsets

## Problem Description

Given a set of distinct integers A, return all possible subsets that can be formed from the elements of array A.

## Problem Constraints

1 ≤ |A| ≤ 16

INT_MIN ≤ A[i] ≤ INT_MAX

Array A is given in increasing order.

All elements of array A are distinct.

## Input Format

First and only argument of input contains a single integer array A.

## Output Format

Return a vector of vectors denoting the answer in any order.

## Example Input

**Input 1:**
```
A = [1]
```

**Input 2:**
```
A = [1, 2, 3]
```

## Example Output

**Output 1:**
```
[
    []
    [1]
]
```

**Output 2:**
```
[
 []
 [1]
 [1, 2]
 [1, 2, 3]
 [1, 3]
 [2]
 [2, 3]
 [3]
]
```

## Example Explanation

**Explanation:**

You can see that these are all possible subsets.

