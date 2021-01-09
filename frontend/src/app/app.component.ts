import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const GET_QUOTES = gql`
  {
    quotes {
      quotes {
        _id
        quote
        authorId
      }
    }
  }
`;

const CREATE_QUOTE = gql`
  mutation createQuote($quote: String!, $authorId: String!) {
    createQuote(quoteInput: { quote: $quote, authorId: $authorId }) {
      _id
      quote
      authorId
    }
  }
`;

const DELETE_QUOTE = gql`
  mutation deleteQuote($id: ID!) {
    deleteQuote(id: $id) {
      _id
      quote
      authorId
    }
  }
`;

const UPDATE_QUOTE = gql`
  mutation updateQuote($id: ID!, $quote: String!, $authorId: String!) {
    updateQuote(id: $id, quoteInput: { quote: $quote, authorId: $authorId } ) {
      quote
      authorId
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      authors {
       _id
       name
      }
    }
  }
`;

const CREATE_AUTHOR = gql`
  mutation createAuthor($name: String!) {
    createAuthor(authorInput: { name: $name} ) {
      _id
      name
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      _id
      name
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($id: ID!, $name: String!) {
    updateAuthor(id: $id, authorInput: { name: $name } ) {
      name
    }
  }
`;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "frontend";

  quotes: Observable<any>;
  authors: Observable<any>;

  constructor(private apollo: Apollo) {}

  /*****Quotes*****/
  ngOnInit() {
    this.quotes = this.apollo
      .watchQuery({
        query: GET_QUOTES,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.quotes.quotes);
          return result.data.quotes.quotes;
        })
      );
    this.authors = this.apollo
      .watchQuery({
        query: GET_AUTHORS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.authors.authors);
          return result.data.authors.authors;
        })
      );
  }

  createQuote(quote: String, authorId: String) {
    this.apollo
      .mutate({
        mutation: CREATE_QUOTE,
        refetchQueries: [{ query: GET_QUOTES }],
        variables: {
          quote: quote,
          authorId: authorId,
        },
      })
      .subscribe(() => {
        console.log("The quote has been created.");
      });
  }

  deleteQuote(id: String) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: DELETE_QUOTE,
        refetchQueries: [{ query: GET_QUOTES }],
        variables: {
          id: id,
        },
      })
      .subscribe(() => {
        console.log("The quote has been deleted.");
      }); 
  }

  updateQuote(id: String, quote: String, authorId: String) {
    this.apollo
      .mutate({
        mutation: UPDATE_QUOTE,
        refetchQueries: [{ query: GET_QUOTES }],
        variables: {
          id: id,
          quote: quote,
          authorId: authorId
        },
      })
      .subscribe((ref) => {
        console.log("The quote has been update.");
      }); 
  }

  /*****Authors*****/
  createAuthor(name: String) {
    this.apollo
      .mutate({
        mutation: CREATE_AUTHOR,
        refetchQueries: [{ query: GET_AUTHORS }],
        variables: {
          name: name,
        },
      })
      .subscribe(() => {
        console.log("The author has been created.");
      });
  }

  deleteAuthor(id: String) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: DELETE_AUTHOR,
        refetchQueries: [{ query: GET_AUTHORS }],
        variables: {
          id: id,
        },
      })
      .subscribe(() => {
        console.log("The author has been deleted.");
      });
  }

  updateAuthor(id: String, name: String) {
    console.log(id);
    try {
    this.apollo
      .mutate({
        mutation: UPDATE_AUTHOR,
        refetchQueries: [{ query: GET_AUTHORS }],
        variables: {
          id: id,
          name: name
        },
      })
      .subscribe(() => {
        try { 
          console.log("The author has been updated.") 
        } catch(err) {
          console.log(err);
        }
      });
    } catch(err) {
      console.log(err);
    }
  }
}
