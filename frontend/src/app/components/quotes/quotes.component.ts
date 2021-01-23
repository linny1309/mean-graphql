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

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.css"],
})
export class QuotesComponent implements OnInit {
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
          return result.data.quotes.quotes;
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
}
