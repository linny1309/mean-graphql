import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.css"],
})
export class AuthorsComponent implements OnInit {
  quotes: Observable<any>;
  authors: Observable<any>;

  constructor(private apollo: Apollo) {}

  /*****Quotes*****/
  ngOnInit() {
    this.authors = this.apollo
      .watchQuery({
        query: GET_AUTHORS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.authors.authors;
        })
      );
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
