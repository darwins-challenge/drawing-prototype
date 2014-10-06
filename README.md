Drawing Prototype
=================

A prototype to explore [genetic programming][] of drawings.

Language
--------

### Syntax

We are going to use the following language to describe our drawings.

```
program  = sequence
sequence = '(' action* ')'
action   = turn
         | step
         | sequence
turn     = 'L'
         | 'R'
step     = 'F'
```

### Semantics

The following machine will execute our programs. It maintains a _directions_ which can be one of *north*, *east*, *south* or *west*. The direction is initialized to be *north*.

The machine will perform the following _actions_:
* `L`: change _direction_ counter clockwise along the compass.
* `R`: change _direction_ clockwise along the compass.
* `F`: take a step in _direction_ leaving a trail.
* *sequence*: perform the actions in sequence.

### Examples

The following programs are all valid.

* `()`
* `(F)`
* `(FLFLFLFL)`
* `((FLF)(FRF))`

[genetic programming]: http://en.wikipedia.org/wiki/Genetic_programming
