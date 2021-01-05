const Quote = require('../models/quote');
const Author = require('../models/author');

module.exports = {
  quotes: async function () {
    const quotes = await Quote.find();
    return {
      quotes: quotes.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },
  createQuote: async function ({ quoteInput }) {
    const quote = new Quote({
      quote: quoteInput.quote,
      author: quoteInput.author,
    });
    const createdQuote = await quote.save();
    return {
      ...createdQuote._doc,
      _id: createdQuote._id.toString(),
    };
  },
  updateQuote: async function ({ id, quoteInput }) {
    const quote = await Quote.findById(id);
    if (!quote) {
      throw new Error('No quote found!');
    }
    quote.quote = quoteInput.quote;
    quote.author = quoteInput.author;
    const updatedQuote = await quote.save();
    return {
      ...updatedQuote._doc,
      _id: updatedQuote._id.toString(),
    };
  },
  deleteQuote: async function ({ id }) {
    const quote = await Quote.findById(id);
    if (!quote) {
      throw new Error('No quote found!');
    }
    await Quote.findByIdAndRemove(id);
    return {
      ...quote._doc,
      _id: quote._id.toString(),
    };
  },
  /*****************************************/
  createAuthor: async function ({ authorInput }) {
    const author = new Author({
      name: authorInput.name,
    });
    const createdAuthor = await author.save();
    return {
      ...createdAuthor._doc,
      _id: createdAuthor._id.toString(),
    };
  },
  updateAuthor: async function ({ id, authorInput }) {
    const author = await Author.findById(id);
    if (!author) {
      throw new Error('No author found!');
    }
    author.name = authorInput.name
    const updatedAuthor = await author.save();
    return {
      ...updatedAuthor._doc,
      _id: updatedAuthor._id.toString(),
    };
  },
  deleteAuthor: async function ({ id }) {
    const author = await Author.findById(id);
    if (!author) {
      throw new Error('No author found!');
    }
    await Author.findByIdAndRemove(id);
    return {
      ...author._doc,
      _id: author._id.toString(),
    };
  },
};
