function findAccountById(accounts, id) {
  // array of accounts and ID of single account
  // Returns account object that has matching ID

  let matchingID = accounts.find((account) => id === account.id);
  return matchingID;
}

function sortAccountsByLastName(accounts) {
  // array of accounts
  // return a sorted array of objects (sorted alphabetically by last name)
  // sort mutates original array

  const sortedAccounts = accounts.sort((acc1, acc2) => acc1.name.last > acc2.name.last ? 1 : -1)
  return sortedAccounts;
}


function numberOfBorrows(account, books) {
  // params: account object and array of all books objects
  // returns a number that represents the number of times the account's ID has appeared in a book's borrow array
  // Need to match account id with borrows id
  // Create a counter variable to keep count of how many times an id has borrowed a book; return this
  // forEach instead of map

  const userID = account['id'];
  let counter = 0;
  
  books.map((element) => element.borrows.forEach((obj) => {
    if (obj.id === userID) {
      counter++;
    }
  }));

  return counter;
}


function booksInPossession(account, books, authors) {
  //Three params: account object, array of all books objects, and array of all author objects
  // Return an array of books and authors that represents all books currently checked out by the given account
  // Consult example (not just the book object, but also the author object)
  // Check book.borrows.returned for false value; if false, return book to its own array of objs
  // Use author Id to grab the specific author from authors.js and push that into final array
  // Should I use a forEach here?
  // Need to embed author object after author.Id and before borrows array

  const userID = account['id'];
  let checkedOutArray = [];
  
  const bookArray = books.forEach((book) => { 
      const { id, title, genre, borrows } = book;
      borrows.forEach((borrowsObj) => {
        if (borrowsObj.returned === false && userID === borrowsObj.id) {
          authors.forEach((author) => {
            if (author.id === book.authorId) {
              let tempBook = { id, title, genre, author, borrows }
              checkedOutArray.push(tempBook);
          }
        })}
      })
    })

  return checkedOutArray; 
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  booksInPossession,
};
