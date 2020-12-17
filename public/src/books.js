function findAuthorById(authors, id) {
  // Returns the author object that has matching id

  let matchingID = authors.find((author) => id === author.id);
  return matchingID;
}

function findBookById(books, id) {
  // Return book object that has matching ID

  let matchingID = books.find((book) => id === book.id);
  return matchingID;
}

function partitionBooksByBorrowedStatus(books) {
  // Return an array with two arrays inside
  // All of the inputted books are present in either the first or second array
  // First array contains books that have been loaned out and not yet returned (book.returned === false)
  // Second array contains books that have been returned (book.returned === true)
  // You can check return status by looking at the first transaction in the borrows array
  
    // Test this later  
  // let borrowedArray = [];
  // let returnedArray = [];

  // books.forEach((book) => {
  //   book.borrows.forEach((borrowObj) => {
  //     if (borrowObj.returned === false) {
  //       borrowedArray.push(book);
  //     } else {
  //       returnedArray.push(book);
  //     }
  //   })
  // })

  // return [borrowedArray, returnedArray];


  let borrowedArray = books.filter((book) => book.borrows[0].returned === false);
  let returnedArray = books.filter((book) => book.borrows[0].returned === true);

  return [borrowedArray, returnedArray];
}


function getBorrowersForBook(book, accounts) {
  // Return an array of all transactions from the book's borrows key
  // However, each transaction should include the related account info
  // and the returned key (return account, then key + value, then rest of account)
  // Does the order the info appears matter?

  // For each transation, find the associated account tied to that id
  let transactionArray = [];

  // loop over borrows array
  // loop over accounts to grab associated with each borrows.id
  // return as one array of objects

  book.borrows.forEach((borrowsObj) => {
    //const userID = borrowsObj.id;
    //const returnKey = borrowsObj.returned;
    accounts.find((account) => {
      if (borrowsObj.id === account.id) {
        let accountObj = {...account};
        accountObj.returned = borrowsObj.returned;
        transactionArray.push(accountObj);
      }
    })
  })

  return transactionArray.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
