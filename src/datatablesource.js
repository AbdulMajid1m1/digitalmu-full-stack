
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,

  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "company",
    headerName: "Company",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.purchasePrice}`}>
          {/* convert date to years montha and year only */}

          {params.row.date.substring(0, 10)}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.sellingPrice}`}>
          {params.row.status}
        </div>
      );
    },
  },

];

export const userColumns2 = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 230,

  },
  {
    field: "taps",
    headerName: "Card Tap",
    width: 130,
  },

  {
    field: "digitalmuUrl",
    headerName: "Digitalmu Url",
    width: 260,
    renderCell: (params) => {
      return (
        // open the params in a new tab

        <span style={{ cursor: "pointer" }}
          onClick={() => window.open(params.row.digitalmuUrl, "_blank")}
        >
          {params.row.digitalmuUrl}
        </span>



      );
    },
  },
  {
    field: "contacts",
    headerName: "Lead No",
    width: 130,
    renderCell: (params) => {
      return (
        <div>
          {params.row.contacts.length}
        </div>

      );
    },

  },


];