import logo from "./logo.svg";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useEffect, useState } from "react";

const columns = [
  { headerName: "Title", field: "title" },
  { headerName: "Author", field: "author" },
  {
    headerName: "Edition Count",
    field: "editionCount",
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  { headerName: "Book ID", field: "id" },
];

function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/drama.json?published_in=2000")
      .then((res) => res.json())
      .then((data) => data.works)
      .then((works) =>
        works.map((book) => {
          return {
            title: book.title,
            author: book.authors[0].name,
            editionCount: book.edition_count,
            id: book.cover_id,
          };
        })
      )
      .then((books) => setRowData(books));
  }, []);

  console.log(rowData);

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "300px", width: "600px" }}
    >
      <AgGridReact columnDefs={columns} rowData={rowData} pagination={true} paginationPageSize={7}/>
    </div>
  );
}

export default App;
