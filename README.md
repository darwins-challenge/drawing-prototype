Drawing Prototype
=================

A prototype to explore [genetic programming][] of drawings.

Language
--------

### Syntax

We are going to use the following language to describe our drawings.

```
program  = 'program(' sequence ');'
sequence = 'sequence()' | 'sequence(' action (',' action)* ')'
action   = turn
         | step
         | sequence
turn     = 'left()'
         | 'right()'
step     = 'forward()'
```

### Semantics

The following machine will execute our programs. It maintains a _directions_ which can be one of *north*, *east*, *south* or *west*. The direction is initialized to be *north*.

The machine will perform the following _actions_:
* `left()`: change _direction_ counter clockwise along the compass.
* `right()`: change _direction_ clockwise along the compass.
* `forward()`: take a step in _direction_ leaving a trail.
* *sequence*: perform the actions in sequence.

### Examples

The following programs are all valid.

* `program(sequence());`
* `program(sequence(forward()));`
* `program(sequence(forward(),left(),forward(),left(),forward(),left(),forward(),left()));`
* `program(sequence(sequence(forward(),left(),forward()),sequence(forward(),right(),forward())));`

[genetic programming]: http://en.wikipedia.org/wiki/Genetic_programming
