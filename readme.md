# JavaScript Best Practices Repository

This repository contains a collection of JavaScript best practices, inspired by the book "Effective JavaScript" by David Herman. These best practices are aimed at helping developers write clean, efficient, and maintainable JavaScript code. They cover a wide range of topics, from understanding JavaScript's core concepts to working with functions, objects, arrays, libraries, and concurrency.

## Table of Contents

1. Accustoming Yourself to JavaScript

   - Item 1: Know Which JavaScript You Are Using
   - Item 2: Understand JavaScript’s Floating-Point Numbers
   - Item 3: Beware of Implicit Coercions
   - Item 4: Prefer Primitives to Object Wrappers
   - Item 5: Avoid using == with Mixed Types
   - Item 6: Learn the Limits of Semicolon Insertion
   - Item 7: Think of Strings As Sequences of 16-Bit Code Units
2. Variable Scope

   - Item 8: Minimize Use of the Global Object
   - Item 9: Always Declare Local Variables
   - Item 10: Avoid with
   - Item 11: Get Comfortable with Closures
   - Item 12: Understand Variable Hoisting
   - Item 13: Use Immediately Invoked Function Expressions to Create Local Scopes
   - Item 14: Beware of Unportable Scoping of Named Function Expressions
   - Item 15: Beware of Unportable Scoping of Block-Local Function Declarations
   - Item 16: Avoid Creating Local Variables with eval
   - Item 17: Prefer Indirect eval to Direct eval
3. Working with Functions

   - Item 18: Understand the Difference between Function, Method, and Constructor Calls
   - Item 19: Get Comfortable Using Higher-Order Functions
   - Item 20: Use call to Call Methods with a Custom Receiver
   - Item 21: Use apply to Call Functions with Different Numbers of Arguments
   - Item 22: Use arguments to Create Variadic Functions
   - Item 23: Never Modify the arguments Object
   - Item 24: Use a Variable to Save a Reference to arguments
   - Item 25: Use bind to Extract Methods with a Fixed Receiver
   - Item 26: Use bind to Curry Functions
   - Item 27: Prefer Closures to Strings for Encapsulating Code
   - Item 28: Avoid Relying on the toString Method of Functions
   - Item 29: Avoid Nonstandard Stack Inspection Properties
4. Objects and Prototypes

   - Item 30: Understand the Difference between prototype, getPrototypeOf, and __proto__
   - Item 31: Prefer Object.getPrototypeOf to __proto__
   - Item 32: Never Modify __proto__
   - Item 33: Make Your Constructors new-Agnostic
   - Item 34: Store Methods on Prototypes
   - Item 35: Use Closures to Store Private Data
   - Item 36: Store Instance State Only on Instance Objects
   - Item 37: Recognize the Implicit Binding of this
   - Item 38: Call Superclass Constructors from Subclass Constructors
   - Item 39: Never Reuse Superclass Property Names
   - Item 40: Avoid Inheriting from Standard Classes
   - Item 41: Treat Prototypes As an Implementation Detail
   - Item 42: Avoid Reckless Monkey-Patching
5. Arrays and Dictionaries

   - Item 43: Build Lightweight Dictionaries from Direct Instances of Object
   - Item 44: Use null Prototypes to Prevent Prototype Pollution
   - Item 45: Use hasOwnProperty to Protect Against Prototype Pollution
   - Item 46: Prefer Arrays to Dictionaries for Ordered Collections
   - Item 47: Never Add Enumerable Properties to Object.prototype
   - Item 48: Avoid Modifying an Object during Enumeration
   - Item 49: Prefer for Loops to for...in Loops for Array Iteration
   - Item 50: Prefer Iteration Methods to Loops
   - Item 51: Reuse Generic Array Methods on Array-Like Objects
   - Item 52: Prefer Array Literals to the Array Constructor
6. Library and API Design

   - Item 53: Maintain Consistent Conventions
   - Item 54: Treat undefined As “No Value”
   - Item 55: Accept Options Objects for Keyword Arguments
   - Item 56: Avoid Unnecessary State
   - Item 57: Use Structural Typing for Flexible Interfaces
   - Item 58: Distinguish between Array and Array-Like
   - Item 59: Avoid Excessive Coercion
   - Item 60: Support Method Chaining
7. Concurrency

   - Item 61: Don’t Block the Event Queue on I/O
   - Item 62: Use Nested or Named Callbacks for Asynchronous Sequencing
   - Item 63: Be Aware of Dropped Errors
   - Item 64: Use Recursion for Asynchronous Loops
   - Item 65: Don’t Block the Event Queue on Computation
   - Item 66: Use a Counter to Perform Concurrent Operations
   - Item 67: Never Call Asynchronous Callbacks Synchronously
   - Item 68: Use Promises for Cleaner Asynchronous Logic

## Contributing

Feel free to contribute to this repository by addressing any issues, improving existing best practices, or adding new best practices.

## License

This repository is licensed under the MIT License.
