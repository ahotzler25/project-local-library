function filterBooks(books) {
  // Helper function that filters books
  // Improve logic to use with multiple functions

  const filteredBooks = books.filter((book) => book.borrows[0].returned === false);
  return filteredBooks.length;
}

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  const loanedBooks = filterBooks(books); // Call helper function and store into variable
  return loanedBooks;
}


function mostCommonGenres(books) {
  // Return an array with five or less objects that represent
  // most common occurring genres, ordered from most common to least
  // Each obj has two keys: {name: "genreName" && count: times genre occurs}
  // If more than five genres are present, .slice(0, 5);
  // need variable to keep count of genre occurrences (or use reduce?)

/* Example Return:
  [
    { name: "Nonfiction", count: 9 },
    { name: "Historical Fiction", count: 7 },
    { name: "Thriller", count: 7 },
    ...
  ]
*/
  
  let allGenres = [];
  
  books.reduce((acc, book) => {
    const genresArr = books.filter((bookOne) => bookOne.genre === book.genre)
    .map((bookTwo) => bookTwo.genre);
    allGenres.push({ name: genresArr[0], count: genresArr.length });
    return acc;
  }, 0);

    // Can I refactor this for readability? Better names?
    const finalArray = allGenres.filter((genre, index, element) => {
      return index === element.findIndex((temp) => temp.name === genre.name && temp.count === genre.count);
    });

    return finalArray.sort((genreOne, genreTwo) => genreTwo.count - genreOne.count).slice(0, 5);
}



function mostPopularBooks(books) {
  // Return an array containing five objects or less that represent most popular books in library
  // Popularity = number of times a book has been borrowed
  // Each obj has two keys { name: book title, count: how many times a book has been borrowed}
  // .slice(0, 5);

  // Sort books by popularity first, then iterate through to add them to popularBooks array?

  let popularBooks = [];
 
  books.sort((book1, book2) => book2.borrows.length - book1.borrows.length).forEach(book => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  });

  // Can I refactor this line for readability?
  const finalArray = popularBooks.filter((book, index, self) => index === self.findIndex((temp) => temp.name === book.name && temp.count === book.count)).slice(0, 5);
  return finalArray;
}



function mostPopularAuthors(books, authors) {
  // Return an array with five objects or less where most popular authors' books have been checked out the most
  // Popularity = times books have been borrowed
  // Each obj in array has two keys {name: first + last, count: number of times book has been borrowed}
  // .slice(0, 5);

  // Use authors.forEach for each author
  // Then filter to check the book's authorId by each author's ID (note the difference)
  // Template literals is the easiest way to retrieve the author's name in proper format

  const popularAuthors = [];
 
  authors.forEach(author => {
    const filtered = books.filter((book) => book.authorId === author.id);
      const authorName = `${author.name.first} ${author.name.last}`;

      // use reduce method to count total books borrowed by certain author 
      const count = filtered.reduce((acc, book) => {
        return acc + book.borrows.length;
      }, 0);

    popularAuthors.push({ name: authorName, count: count });
  });

  return popularAuthors.sort((author1, author2) => author2.count - author1.count).slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  mostCommonGenres,
  mostPopularBooks,
  mostPopularAuthors,
};
