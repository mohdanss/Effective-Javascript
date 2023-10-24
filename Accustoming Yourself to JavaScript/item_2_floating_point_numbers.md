# Item 2: Understand JavaScript’s Floating-Point

In JavaScript, numbers are treated as double-precision floating-point numbers, and there is no distinct integer data type. This means that the `typeof` operator classifies integers and floating-point numbers alike as simply "number."
```javascript
typeof 17; // "number"
typeof 98.6; // "number"
typeof -2.1; // "number"
```

All numbers in JavaScript are represented as double-precision floating-point numbers, which conform to the IEEE 754 standard, commonly known as "doubles." Doubles can accurately represent integers with up to 53 bits of precision. Therefore, JavaScript can perform integer arithmetic despite the absence of a separate integer data type.

Arithmetic operators in JavaScript can work with integers, real numbers, or combinations of both:
```javascript
0.1 * 1.9 // 0.19
-99 + 100; // 1
21 - 12.3; // 8.7
2.5 / 5; // 0.5
21 % 8; // 5
```

Bitwise arithmetic operators in JavaScript, however, treat their arguments differently. Instead of directly operating on them as floating-point numbers, these operators implicitly convert them to 32-bit integers, using two's complement notation.
```javascript
8 | 1; // 9
```

For example, the bitwise OR expression requires converting the numbers 8 and 1 to their 32-bit binary representations and performing a bitwise OR operation. The result, 9, is the integer representation of the bitwise OR result.
```javascript
(8).toString(2); // "1000"
(1).toString(2); // "1"
```

All of the bitwise operators in JavaScript work similarly, converting their inputs to integers and performing operations on the integer bit patterns before converting the results back to standard JavaScript floating-point numbers.

It's important to be cautious when working with floating-point numbers in JavaScript because they are inherently imprecise. Even seemingly simple arithmetic operations can produce inaccurate results due to rounding errors:
```javascript
0.1 + 0.2; // 0.30000000000000004
```

While doubles offer 64 bits of precision, they can only represent a finite set of numbers, not the infinite set of real numbers. Floating-point arithmetic can only produce approximate results, rounding to the nearest representable real number. When multiple calculations are performed, rounding errors can accumulate, leading to progressively less accurate results. Furthermore, floating-point arithmetic may not always adhere to expected properties like associativity, which is true for real numbers.
```javascript
(0.1 + 0.2) + 0.3; // 0.6000000000000001
0.1 + (0.2 + 0.3); // 0.6
```

The trade-off with floating-point numbers is between accuracy and performance. When precision is critical, it's essential to be aware of the limitations of floating-point arithmetic. A common workaround is to work with integers whenever possible, as they can be represented without rounding.

When dealing with financial calculations, it's a common practice to scale numbers to work with the smallest currency denomination. For example, instead of working with dollars, you might work with cents to ensure accurate integer calculations:
```javascript
(10 + 20) + 30; // 60
10 + (20 + 30); // 60
```

With integers, you need to ensure that calculations stay within the range between -2^53 and 2^53, but you don't have to worry about rounding errors.

## Things to Remember

- JavaScript numbers are double-precision floating-point numbers.
- Integers in JavaScript are just a subset of doubles rather than a separate data type.
- Bitwise operators treat numbers as if they were 32-bit signed integers.
- Be aware of limitations of precision in floating-point arithmetic.