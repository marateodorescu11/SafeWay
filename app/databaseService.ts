import { openDatabase } from 'react-native-sqlite-storage';

// Function to establish a connection to the SQLite database
export const getDBConnection = async () => {
  return openDatabase({ name: 'todo-data.db', location: 'default' });
};

// Function to create the zones table (if it doesn't exist)
export const createTable = async () => {
  const db = await getDBConnection();
  
  // Create the zones table with necessary columns
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS zones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL,
        longitude REAL,
        radius REAL,
        description TEXT
      );`
    );
  });
};

// Insert a new zone into the zones table
export const insertZone = async (latitude: number, longitude: number, radius: number, description: string) => {
  const db = await getDBConnection();
  
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO zones (latitude, longitude, radius, description) VALUES (?, ?, ?, ?);',
      [latitude, longitude, radius, description]
    );
  });
};

// Function to fetch all zones from the database
export const getZones = async () => {
  const db = await getDBConnection();
  
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM zones;',
        [],
        (_, { rows }) => {
          resolve(rows.raw());  // Using raw() to access the rows as an array
        },
        (error) => {
          reject(error);  // Reject if there is an error
        }
      );
    });
  });
};
