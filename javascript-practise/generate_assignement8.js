const fs = require('fs');

const files = {
// ==========================================
// Q1: Student Result Processing (reduce + Classes)
// ==========================================
"q1_student_result.js": `"use strict";

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    // Calculate average using Array.prototype.reduce()
    calculateAverage() {
        if (!this.marks || this.marks.length === 0) return 0;
        const total = this.marks.reduce((sum, mark) => sum + mark, 0);
        return total / this.marks.length;
    }

    // Return grade (A / B / C / F) based on average
    getGrade() {
        const avg = this.calculateAverage();
        if (avg >= 85) return "A";
        if (avg >= 70) return "B";
        if (avg >= 50) return "C";
        return "F";
    }

    displayResult() {
        const avg = this.calculateAverage().toFixed(2);
        const grade = this.getGrade();
        console.log(\`Student: \${this.name} | Marks: [\${this.marks.join(", ")}] | Average: \${avg} | Grade: \${grade}\`);
    }
}

// Testing for 3 students
console.log("--- Q1: Student Result Processing ---");
const students = [
    new Student("Aarav", [92, 88, 95, 89]),
    new Student("Sneha", [74, 68, 79, 72]),
    new Student("Rohan", [42, 48, 39, 51])
];

students.forEach(student => student.displayResult());
`,

// ==========================================
// Q2: Online Food Ordering (map + Error Handling)
// ==========================================
"q2_food_ordering.js": `"use strict";

const menu = [
    { name: "Paneer Tikka", price: 220 },
    { name: "Masala Dosa", price: 120 },
    { name: "Veg Biryani", price: 180 },
    { name: "Cold Coffee", price: 90 }
];

function calculateBill(orderItems) {
    // Use map() to convert ordered item names into a list of prices
    const priceList = orderItems.map(itemName => {
        const foundItem = menu.find(
            menuItem => menuItem.name.toLowerCase() === itemName.toLowerCase()
        );

        if (!foundItem) {
            throw new Error(\`Invalid item ordered: "\${itemName}" is not on the menu.\`);
        }

        return foundItem.price;
    });

    // Use reduce() to calculate the total bill
    const totalAmount = priceList.reduce((total, price) => total + price, 0);
    return { priceList, totalAmount };
}

console.log("--- Q2: Online Food Ordering ---");

// Test 1: Valid Order
try {
    const validOrder = ["Paneer Tikka", "Veg Biryani", "Cold Coffee"];
    const bill = calculateBill(validOrder);
    console.log("Ordered Items:", validOrder);
    console.log("Item Prices:  ", bill.priceList);
    console.log(\`Total Bill:    ₹\${bill.totalAmount}\`);
} catch (error) {
    console.error("Order Failed:", error.message);
}

console.log("--------------------------------");

// Test 2: Invalid Order (triggers error handling)
try {
    const invalidOrder = ["Masala Dosa", "Sushi Platter"];
    const bill = calculateBill(invalidOrder);
    console.log(\`Total Bill: ₹\${bill.totalAmount}\`);
} catch (error) {
    console.error("Order Failed:", error.message);
}
`,

// ==========================================
// Q3: Product Discount System (Prototypes & Abstraction)
// ==========================================
"q3_product_discount.js": `"use strict";

// Constructor function
function Product(name, price) {
    this.name = name;
    this.price = price;
}

// Prototype method abstracting away discount calculation logic
Product.prototype.applyDiscount = function (percent) {
    if (percent < 0 || percent > 100) {
        throw new Error("Discount percentage must be between 0 and 100.");
    }
    const discountAmount = (this.price * percent) / 100;
    return Number((this.price - discountAmount).toFixed(2));
};

console.log("--- Q3: Product Discount System ---");

const product1 = new Product("Mechanical Keyboard", 3500);
const product2 = new Product("Wireless Mouse", 1200);
const product3 = new Product("USB-C Hub", 2000);

console.log(\`\${product1.name}: Original = ₹\${product1.price} | After 10% Discount = ₹\${product1.applyDiscount(10)}\`);
console.log(\`\${product2.name}: Original = ₹\${product2.price} | After 25% Discount = ₹\${product2.applyDiscount(25)}\`);
console.log(\`\${product3.name}: Original = ₹\${product3.price} | After 15% Discount = ₹\${product3.applyDiscount(15)}\`);

/*
 * HOW ABSTRACTION SIMPLIFIES OPERATIONS:
 * Callers only interact with a clean interface: product.applyDiscount(percent).
 * The internal formula (price - (price * percent / 100)), rounding logic, and
 * validation rules remain encapsulated inside Product.prototype, preventing
 * duplicate arithmetic across the codebase.
 */
`,

// ==========================================
// Q4: Employee Inheritance & Runtime Polymorphism
// ==========================================
"q4_employee_inheritance.js": `"use strict";

class Employee {
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    work() {
        console.log(\`\${this.name} (\${this.department}) is executing assigned technical tasks.\`);
    }
}

class Manager extends Employee {
    constructor(name, department, teamSize) {
        super(name, department);
        this.teamSize = teamSize;
    }

    // Overriding parent work() method
    work() {
        console.log(\`\${this.name} (\${this.department} Manager) is leading a team of \${this.teamSize} and planning sprints.\`);
    }
}

console.log("--- Q4: Employee Inheritance & Runtime Polymorphism ---");

// Storing different subclass objects in a unified collection
const staffMembers = [
    new Employee("Karan", "Backend Engineering"),
    new Manager("Priya", "Cyber Security", 8),
    new Employee("Vikram", "QA & Testing"),
    new Manager("Ananya", "Product", 5)
];

// Runtime polymorphism: JS dynamically resolves the appropriate work() method per instance
staffMembers.forEach(member => member.work());
`,

// ==========================================
// Q5: Ride-Sharing Application
// ==========================================
"q5_ride_sharing.js": `"use strict";

class User {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }
}

class Driver extends User {
    constructor(name, rating, vehicleDetails) {
        super(name, rating);
        this.vehicleDetails = vehicleDetails;
    }
}

class Trip {
    constructor(fromLocation, toLocation, distance, driver = null) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
        this.driver = driver;
    }

    calculateFare() {
        if (this.distance === undefined || this.distance === null || typeof this.distance !== "number" || Number.isNaN(this.distance)) {
            throw new Error("Distance must be provided as a valid number.");
        }
        if (this.distance <= 0) {
            throw new Error("Distance cannot be zero or negative.");
        }

        const baseFare = 30;
        const ratePerKm = 12;
        return baseFare + this.distance * ratePerKm;
    }
}

console.log("--- Q5: Ride-Sharing Application ---");

const driver1 = new Driver("Rajesh", 4.9, "Maruti Swift Dzire (UP-85-AB-1234)");

// Test 1: Valid Trip
try {
    const trip1 = new Trip("Mathura Junction", "GLA University", 14, driver1);
    const fare = trip1.calculateFare();
    console.log(\`Trip: \${trip1.fromLocation} -> \${trip1.toLocation} (\${trip1.distance} km)\`);
    console.log(\`Driver: \${driver1.name} (Rating: \${driver1.rating}★) | Vehicle: \${driver1.vehicleDetails}\`);
    console.log(\`Calculated Fare: ₹\${fare}\`);
} catch (error) {
    console.error("Trip Error:", error.message);
}

console.log("--------------------------------");

// Test 2: Negative Distance
try {
    const invalidTrip = new Trip("Aligarh", "Agra", -25);
    console.log(\`Fare: ₹\${invalidTrip.calculateFare()}\`);
} catch (error) {
    console.error("Trip Error (Negative Distance):", error.message);
}

// Test 3: Missing Distance
try {
    const missingDistanceTrip = new Trip("Delhi", "Noida");
    console.log(\`Fare: ₹\${missingDistanceTrip.calculateFare()}\`);
} catch (error) {
    console.error("Trip Error (Missing Distance):", error.message);
}
`,

// ==========================================
// Q6: E-Commerce Inventory System
// ==========================================
"q6_ecommerce_inventory.js": `"use strict";

const inventory = [
    { id: 1, name: "Laptop", category: "Electronics", price: 55000, stock: 4 },
    { id: 2, name: "Wireless Earbuds", category: "Electronics", price: 2500, stock: 18 },
    { id: 3, name: "Ergonomic Chair", category: "Furniture", price: 12000, stock: 3 },
    { id: 4, name: "Study Desk", category: "Furniture", price: 8500, stock: 7 },
    { id: 5, name: "Notebook Pack", category: "Stationery", price: 300, stock: 50 },
    { id: 6, name: "Fountain Pen", category: "Stationery", price: 950, stock: 2 }
];

// 1. Get products with stock <= 5 using filter()
function getLowStockProducts(products, threshold = 5) {
    return products.filter(product => product.stock <= threshold);
}

// 2. Sort products by price ascending using sort()
function sortProductsByPrice(products) {
    // Shallow copy with [...products] avoids mutating the original array
    return [...products].sort((a, b) => a.price - b.price);
}

// 3. Calculate total value of all stock using reduce()
function calculateTotalInventoryValue(products) {
    return products.reduce((total, product) => total + product.price * product.stock, 0);
}

// 4. Group products by category using reduce() + object grouping
function groupByCategory(products) {
    return products.reduce((grouped, product) => {
        if (!grouped[product.category]) {
            grouped[product.category] = [];
        }
        grouped[product.category].push(product);
        return grouped;
    }, {});
}

console.log("--- Q6: E-Commerce Inventory System ---");

console.log("\n1. Low Stock Products (stock <= 5):");
console.table(getLowStockProducts(inventory));

console.log("\n2. Products Sorted by Price (Low to High):");
console.table(sortProductsByPrice(inventory));

console.log(\`\n3. Total Inventory Value: ₹\${calculateTotalInventoryValue(inventory).toLocaleString("en-IN")}\`);

console.log("\n4. Products Grouped by Category:");
console.log(groupByCategory(inventory));
`,

// ==========================================
// Q7: Banking Application (Private Fields + Error Handling)
// ==========================================
"q7_banking_app.js": `"use strict";

class BankAccount {
    // Private field
    #balance;

    constructor(accountHolder, initialBalance = 0) {
        if (initialBalance < 0) {
            throw new Error("Initial balance cannot be negative.");
        }
        this.accountHolder = accountHolder;
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Deposit amount must be greater than zero.");
        }
        this.#balance += amount;
        console.log(\`Deposited ₹\${amount}. Updated Balance: ₹\${this.#balance}\`);
    }

    withdraw(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("Withdrawal amount must be greater than zero.");
        }
        if (amount > this.#balance) {
            throw new Error(\`Insufficient balance! Available: ₹\${this.#balance}, Requested: ₹\${amount}\`);
        }
        this.#balance -= amount;
        console.log(\`Withdrew ₹\${amount}. Remaining Balance: ₹\${this.#balance}\`);
    }

    getBalance() {
        return this.#balance;
    }
}

console.log("--- Q7: Banking Application ---");

const account = new BankAccount("Chaitanya Pandey", 5000);
console.log(\`Account Holder: \${account.accountHolder} | Initial Balance: ₹\${account.getBalance()}\`);

// Valid deposits & withdrawals
try {
    account.deposit(2500);
    account.withdraw(1500);
} catch (error) {
    console.error("Transaction Error:", error.message);
}

// Invalid withdrawal (exceeds available balance)
try {
    console.log("Attempting to withdraw ₹10000...");
    account.withdraw(10000);
} catch (error) {
    console.error("Transaction Failed:", error.message);
}

console.log(\`Final Verified Balance: ₹\${account.getBalance()}\`);
`,

// ==========================================
// Q8: Movie Ticket Booking System (Inheritance + Prototype Chain)
// ==========================================
"q8_movie_ticket.js": `"use strict";

class MovieTicket {
    constructor(movieName, seatNo, price) {
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = price;
    }
}

// Adding method directly to MovieTicket.prototype
MovieTicket.prototype.printTicket = function () {
    console.log(\`[TICKET] Movie: \${this.movieName} | Seat: \${this.seatNo} | Base Price: ₹\${this.price}\`);
};

class OnlineTicket extends MovieTicket {
    constructor(movieName, seatNo, price, convenienceFee) {
        super(movieName, seatNo, price);
        this.convenienceFee = convenienceFee;
    }

    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

console.log("--- Q8: Movie Ticket Booking System ---");

const ticket1 = new OnlineTicket("Interstellar", "F-12", 350, 45);

// Calling printTicket() defined on MovieTicket.prototype from an OnlineTicket instance
ticket1.printTicket();
console.log(\`Convenience Fee: ₹\${ticket1.convenienceFee} | Total Payable: ₹\${ticket1.getTotalAmount()}\`);

// Demonstrating the prototype chain
console.log("\n--- Prototype Chain Verification ---");
console.log("ticket1 instanceof OnlineTicket:", ticket1 instanceof OnlineTicket); // true
console.log("ticket1 instanceof MovieTicket: ", ticket1 instanceof MovieTicket);  // true
console.log(
    "OnlineTicket.prototype inherits from MovieTicket.prototype:",
    Object.getPrototypeOf(OnlineTicket.prototype) === MovieTicket.prototype
); // true
`,

// ==========================================
// Q9: Fitness App Analytics
// ==========================================
"q9_fitness_analytics.js": `"use strict";

const workoutData = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];

class FitnessAnalytics {
    constructor(data) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Workout dataset cannot be empty.");
        }
        this.data = data;
    }

    // Users with steps > 7000 using filter()
    getActiveUsers() {
        return this.data.filter(entry => entry.steps > 7000);
    }

    // Average calories burned using reduce()
    getAverageCalories() {
        const totalCalories = this.data.reduce((sum, entry) => sum + entry.calories, 0);
        return Number((totalCalories / this.data.length).toFixed(2));
    }

    // Formatted summary messages using map()
    getUserSummary() {
        return this.data.map(
            entry => \`User \${entry.user} completed \${entry.steps} steps and burned \${entry.calories} kcal.\`
        );
    }
}

console.log("--- Q9: Fitness App Analytics ---");

try {
    const analytics = new FitnessAnalytics(workoutData);

    console.log("1. Active Users (steps > 7000):");
    console.table(analytics.getActiveUsers());

    console.log(\`2. Average Calories Burned: \${analytics.getAverageCalories()} kcal\`);

    console.log("\n3. User Summaries:");
    analytics.getUserSummary().forEach(msg => console.log("- " + msg));
} catch (error) {
    console.error("Analytics Error:", error.message);
}

console.log("--------------------------------");

// Testing error handling on an empty dataset
try {
    const emptyAnalytics = new FitnessAnalytics([]);
    emptyAnalytics.getActiveUsers();
} catch (error) {
    console.error("Empty Dataset Handled:", error.message);
}
`
};

for (const [filename, content] of Object.entries(files)) {
    fs.writeFileSync(filename, content.trim(), 'utf8');
    console.log(`Created: ${filename}`);
}

console.log('\nAll 9 JavaScript files successfully generated!');