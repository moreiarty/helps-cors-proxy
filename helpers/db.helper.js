const sql = require('mssql');

export async function getWorkshops() {
  // try {
  //   await sql.connect("mssql://usr_db:passw0rd@52.62.213.92:1433/elssa_booking");
  //     const request = new sql.Request();
  //     const workshops = await request.query('select * from workshops');
  //     return workshops;
  // } catch (err) {
  //   console.log(err);
  // }
  sql.connect("mssql://usr_db:passw0rd@52.62.213.92:1433/elssa_booking").then(function() {
      // Query
      new sql.Request().query('select * from workshops').then(function(recordset) {
          console.dir(recordset);
      }).catch(function(err) {
          // ... query error checks
          console.log(err);
      });

      // // Stored Procedure

      // new sql.Request()
      // .input('input_parameter', sql.Int, value)
      // .output('output_parameter', sql.VarChar(50))
      // .execute('procedure_name').then(function(recordsets) {
      //     console.dir(recordsets);
      // }).catch(function(err) {
      //     // ... execute error checks
      // });

      // // ES6 Tagged template literals (experimental)

      // sql.query`select * from mytable where id = ${value}`.then(function(recordset) {
      //     console.dir(recordset);
      // }).catch(function(err) {
      //     // ... query error checks
      // });
  }).catch(function(err) {
      // ... connect error checks
      console.log(err);
  });
}