const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const books = new Map();

function addBook(id, title, author) {
  if (books.has(id)) {
    console.log("Book id already exists.");
    showMenu();
    return;
  }
  books.set(id, { title, author, status: "Available" });
  console.log("Book added to library");
}

function displayBooks() {
  if (books.size === 0) {
    console.log("No books available.");
    return;
  }
  console.log("\nLibrary Books:");
  books.forEach((book, id) => {
    console.log(`ID: ${id}, Title: ${book.title}, Author: ${book.author}, Status: ${book.status}`);
  });
}

function borrowBook(id) {
  if (books.has(id)) {
    let book = books.get(id);
    if (book.status === "Available") {
      book.status = "Borrowed";
      console.log(`You borrowed: ${book.title}`);
    } else {
      console.log("Book is already borrowed.");
    }
  } else {
    console.log("Invalid Book ID.");
  }
}

function returnBook(id) {
  if (books.has(id)) {
    let book = books.get(id);
    if (book.status === "Borrowed") {
      book.status = "Available";
      console.log(`You returned: ${book.title}`);
    } else {
      console.log("Book was not borrowed.");
    }
  } else {
    console.log("Invalid Book ID.");
  }
}

function deleteBook(id) {
  if (books.delete(id)) {
    console.log("Book deleted successfully.");
  } else {
    console.log("Invalid Book ID.");
  }
}

function showMenu() {
  console.log("\nLibrary Management System");
  console.log("1. Add Book");
  console.log("2. Display Books");
  console.log("3. Borrow Book");
  console.log("4. Return Book");
  console.log("5. Delete Book");
  console.log("6. Exit");
  rl.question("Choose an option: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter Book ID: ", (id) => {
          rl.question("Enter book title: ", (title) => {
            rl.question("Enter author name: ", (author) => {
              addBook(parseInt(id), title, author);
              showMenu();
            });
          });
        });
        break;
      case "2":
        displayBooks();
        showMenu();
        break;
      case "3":
        rl.question("Enter Book ID to borrow: ", (id) => {
          borrowBook(parseInt(id));
          showMenu();
        });
        break;
      case "4":
        rl.question("Enter Book ID to return: ", (id) => {
          returnBook(parseInt(id));
          showMenu();
        });
        break;
      case "5":
        rl.question("Enter Book ID to delete: ", (id) => {
          deleteBook(parseInt(id));
          showMenu();
        });
        break;
      case "6":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid option, try again.");
        showMenu();
    }
  });
}

showMenu();