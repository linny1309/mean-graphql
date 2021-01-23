import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-quotes-read',
  templateUrl: './quotes-read.component.html',
  styleUrls: ['./quotes-read.component.css']
})
export class QuotesReadComponent implements OnInit {
  quotes: Observable<any>;

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

  testGet() {
    alert(this.quotes);
  }
}
