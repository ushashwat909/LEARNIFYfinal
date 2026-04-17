# Meeting Rooms II

## Problem Description

You are given an array B of meeting time intervals where each interval is represented as [start, end] (with start < end). You need to find the minimum number of conference rooms required to host all the meetings.

## Problem Constraints

A == B.length

1 <= B.length <= 10^4

0 <= start < end <= 10^6

## Input Format

First Argument is an Integer A, denoting the number of meetings.

Second Argument is a 2-D integer Array B of Size Ax2, representing the start and end timing of the meetings.

## Output Format

Return a single integer representing the minimum number of conference rooms required.

## Example Input

**Input 1:**
```
A = 3
B = [[0, 30], [5, 10], [15, 20]]
```

**Input 2:**
```
A = 1
B = [[0, 1]]
```

## Example Output

**Output 1:**
```
2
```

**Output 2:**
```
1
```

## Example Explanation

**Explanation 1:**

We need two rooms:

Room 1: [0, 30]

Room 2: [5, 10], [15, 20]

**Explanation 2:**

Since there is only one meeting, we need one room.


