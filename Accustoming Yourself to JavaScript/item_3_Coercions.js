/*
JavaScript can be surprisingly forgiving when it comes to type errors. Many
languages consider an expression like
3 + true; // 4
to be an error, because boolean expressions such as true are incompatible with
arithmetic. In a statically typed language, (such as Java or C++), a program
with such an expression would not even be allowed to run. In some dynamically
typed languages, (such as Python or Ruby), while the program would run, such an
expression would throw an exception. JavaScript not only allows the program to
run, but it happily produces the result 4!

There are a handful of cases in JavaScript where providing the wrong type
produces an immediate error, such as calling a nonfunction or attempting to
select a property of null:
"hello"(1); // error: not a function
null.x; // error: can't read properties of null

But in many other cases, rather than raising an error, JavaScript coerces a
value to the expected type by following various automatic conversion
protocols. For example, the arithmetic operators -, *, /, and % all attempt to
convert their arguments to numbers before doing their calculation. The 
operator + is subtler, because it is overloaded to perform either numeric
addition or string concatenation, depending on the types of its arguments:
2 + 3; // 5
"hello" + " world"; // "hello world"

Now, what happens when you combine a number and a string? JavaScript breaks
the tie in favor of strings, converting the number to a string:
"2" + 3; // "23"
2 + "3"; // "23"

Mixing types like this can sometimes be confusing, especially because it’s
sensitive to the order of operations. Take the expression:
1 + 2 + "3"; // "33"
Since addition groups to the left (i.e., is left-associative), this is the
same as:
(1 + 2) + "3"; // "33"
By contrast, the expression
1 + "2" + 3; // "123"
evaluates to the string "123"—again, left-associativity dictates that the
expression is equivalent to wrapping the left-hand addition in parentheses:
(1 + "2") + 3; // "123"
The bitwise operations not only convert to numbers but to the subset of
numbers that can be represented as 32-bit integers, as discussed in Item 2.
These include the bitwise arithmetic operators (~, &, ^, and |) and the shift
operators (<<, >>, and >>>).

These coercions can be seductively convenient—for example, for automatically
converting strings that come from user input, a text file, or a network stream:
"17" * 3; // 51
"8" | "1"; // 9
But coercions can also hide errors. A variable that turns out to be null will
not fail in an arithmetic calculation, but silently convert to 0; an undefined
variable will convert to the special floating-point value NaN 
(the paradoxically named “not a number” number--blame the IEEE floating-point
standard!). Rather than immediately throwing an exception, these coercions
cause the calculation to continue with often confusing and unpredictable
results. Frustratingly, it’s particularly difficult even to test for the NaN
value, for two reasons.
- First, JavaScript follows the IEEE floating-point standard’s headscratching
requirement that NaN be treated as unequal to itself. So testing whether a
value is equal to NaN doesn’t work at all:
var x = NaN;
x === NaN; // false

Moreover, the standard isNaN library function is not very reliable because it
comes with its own implicit coercion, converting its argument to a number
before testing the value. (A more accurate name for isNaN probably would have
been coercesToNaN.) If you already know that a value is a number, you can test
it for NaN with isNaN:
isNaN(NaN); // true
But other values that are definitely not NaN, yet are nevertheless coercible
to NaN, are indistinguishable to isNaN:
isNaN("foo"); // true
isNaN(undefined); // true
isNaN({}); // true
isNaN({ valueOf: "foo" }); // true

Luckily there’s an idiom that is both reliable and concise—if somewhat
unintuitive—for testing for NaN. Since NaN is the only JavaScript value that
is treated as unequal to itself, you can always test if a value is NaN by
checking it for equality to itself:

var a = NaN;
a !== a; // true
var b = "foo";
b !== b; // false
var c = undefined;
c !== c; // false
var d = {};
d !== d; // false
var e = { valueOf: "foo" };
e !== e; // false
You can also abstract this pattern into a clearly named utility function:
function isReallyNaN(x) 
{
    return x !== x;
}

Silent coercions can make debugging a broken program particularly frustrating,
since they cover up errors and make them harder to diagnose. When a
calculation goes wrong, the best approach to debugging is to inspect the 
intermediate results of a calculation, working back to the last point before
things went wrong. From there, you can inspect the arguments of each operation
looking for arguments of the wrong type. Depending on the bug, it could be a
logical error, such as using the wrong arithmetic operator, or a type error,
such as passing the undefined value instead of a number.

Objects can also be coerced to primitives. This is most commonly used for
converting to strings:
"the Math object: " + Math; // "the Math object: [object Math]"
"the JSON object: " + JSON; // "the JSON object: [object JSON]"
Objects are converted to strings by implicitly calling their toString method.
You can test this out by calling it yourself:
Math.toString(); // "[object Math]"
JSON.toString(); // "[object JSON]"

Similarly, objects can be converted to numbers via their valueOf method. You
can control the type conversion of objects by defining these methods:
"J" + { toString: function() { return "S"; } }; // "JS"
2 * { valueOf: function() { return 3; } }; // 6

Once again, things get tricky when you consider that + is overloaded to
perform both string concatenation and addition. Specifically, when an object
contains both a toString and a valueOf method, it’s not obvious which method
+ should call: 
It’s supposed to choose between concatenation and addition based on types, but
with implicit coercion, the types are not actually given! JavaScript resolves
this ambiguity by blindly choosing valueOf over toString. But this means that
if someone intends to perform a string concatenation with an object,
it can behave unexpectedly:
var obj = {
 toString: function() {
    return "[object MyObject]";
 },
 valueOf: function() {
    return 17;
 }
};

"object: " + obj; // "object: 17"

The moral of this story is that valueOf was really only designed to be used
for objects that represent numeric values such as Number objects. For these
objects, the toString and valueOf methods return consistent results— a string
representation or numeric representation of the same number—so the overloaded
+ always behaves consistently regardless of whether the object is used for
concatenation or addition. In general, coercion to strings is far more common
and useful than coercion to numbers. It’s best to avoid valueOf unless your
object really is a numeric abstraction and obj.toString() produces a string
representation of obj.valueOf().

The last kind of coercion is sometimes known as truthiness. Operators such as
if, ||, and && logically work with boolean values, but actually accept any
values. JavaScript values are interpreted as boolean values according to a
simple implicit coercion. Most JavaScript values are truthy, that is,
implicitly coerced to true. This includes all objects—unlike string and number
coercion, truthiness does not involve implicitly invoking any coercion methods.
There are exactly seven falsy values: false, 0, -0, "", NaN, null, and 
undefined. All other values are truthy. Since numbers and strings can be falsy
it’s not always safe to use truthiness to check whether a function argument or
object property is defined. Consider a function that takes optional arguments
with default values:

function point(x, y) {
    if (!x) {
        x = 320;
    }
    if (!y) {
        y = 240;
    }
    return { x: x, y: y };
}

This function ignores any falsy arguments, which includes 0:
    point(0, 0); // { x: 320, y: 240 }
The more precise way to check for undefined is to use typeof:
function point(x, y) {
    if (typeof x === "undefined") {
        x = 320;
    }
    if (typeof y === "undefined") {
        y = 240;
    }
    return { x: x, y: y };
}

This version of point correctly distinguishes between 0 and undefined:
point(); // { x: 320, y: 240 }
point(0, 0); // { x: 0, y: 0 }

Another approach is to compare to undefined:
    if (x === undefined) { ... }

Item 54 discusses the implications of truthiness testing for library and API
design.

Things to Remember
- Type errors can be silently hidden by implicit coercions.
- The + operator is overloaded to do addition or string concatenation
    depending on its argument types.
- Objects are coerced to numbers via valueOf and to strings via toString.
- Objects with valueOf methods should implement a toString method that
    provides a string representation of the number produced by valueOf.
- Use typeof or comparison to undefined rather than truthiness to test for
    undefined values.
*/

console.log(NaN === NaN); // false