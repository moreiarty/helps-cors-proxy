const sql = require('mssql');
// const connection = new sql.Connection({
//   user: 'usr_db',
//   password: 'passw0rd',
//   server: '52.62.213.92',
//   port: '1433',
//   database: 'elssa_booking'
// }).connect();

export async function getWorkshops() {
  // try {
  //   const request = new sql.Request(connection);
  //   const workshops = await request.query('SELECT TOP 10 * FROM Workshops');
  //   return workshops;
  // } catch (err) {
  //   console.log(err);
  // }
  try {
    await sql.connect("mssql://usr_db:passw0rd@52.62.213.92:1433/elssa_booking");
    const request = new sql.Request();
    const workshops = await request.query('SELECT TOP 10 * FROM Workshops');
    return workshops;
  } catch (err) {
    console.log(err);
  }
}

export async function createWorkshop(id, topic, description, campusID, starting, ending, maximum, cutoff, creatorID, archiverID, archived, WorkShopSetID, type, created) {
  try {
    await sql.connect("mssql://usr_db:passw0rd@52.62.213.92:1433/elssa_booking");
    const request = new sql.Request();
    const workshop = await request.query(`SET IDENTITY_INSERT [dbo].[workshops] ON  INSERT [dbo].[workshops] ([id], [topic], [description], [targetingGroup], [campusID], [starting], [ending], [maximum], [cutoff], [creatorID], [created], [modifierID], [modified], [archiverID], [archived], [WorkShopSetID], [type], [reminder_num], [reminder_sent]) VALUES (${id}, N'${topic}', N'${description}', NULL, ${campusID}, '${starting}', '${ending}', ${maximum}, ${cutoff}, ${creatorID}, '${created}', NULL, NULL, ${archiverID}, '${archived}', ${WorkShopSetID}, N'${type}', 0, 0) SET IDENTITY_INSERT [dbo].[workshops] OFF`);
    return workshop;
  } catch (err) {
    console.log(err);
  }
}