# Day 5: Chronal Coordinates

## Part 1

The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

- 1, 1
- 1, 6
- 8, 3
- 3, 4
- 5, 5
- 8, 9

If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

```
..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.
```

This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

```
aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf
```

Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

In this example, the areas of coordinates A, B, C, and F are `infinite` - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to `9` locations, and E is closest to `17` (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is `17`.

**What is the size of the largest area that isn't infinite?**

## Part 2

*Strategy 2*: Of all guards, which guard is most frequently asleep on the same minute?

In the example above, `Guard #99` spent minute `45` asleep more than any other guard or minute - three times in total. (In all other cases, any guard spent any minute asleep at most twice.)

**What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 99 * 45 = 4455)**

See
- https://adventofcode.com/2018/day/5