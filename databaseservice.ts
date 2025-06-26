import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  try {
    return await SQLite.openDatabase({ name: 'dangerZones.db', location: 'default' });
  } catch (err) {
    console.error("❌ Could not open DB:", err);
    throw err;
  }
};

// Create the zones table
export const createTable = async () => {
  const db = await getDBConnection();
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

// Insert a new zone
export const insertZone = async (
  latitude: number,
  longitude: number,
  radius: number,
  description: string
) => {
  const db = await getDBConnection();
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO zones (latitude, longitude, radius, description) VALUES (?, ?, ?, ?);',
      [latitude, longitude, radius, description]
    );
  });
};

// Fetch all zones
export const getZones = async (): Promise<any[]> => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM zones;',
        [],
        (_, { rows }) => resolve(rows.raw()),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

// Utility: degrees to radians
const toRadians = (degree: number): number => degree * (Math.PI / 180);

// Compute distance between two GPS points in meters
export const getDistanceFromLatLonInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000; // Earth radius in meters
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Check if user is inside any danger zone
export const isUserInDangerZone = async (
  userLat: number,
  userLon: number
): Promise<boolean> => {
  const zones = await getZones();

  for (const zone of zones) {
    const distance = getDistanceFromLatLonInMeters(
      userLat,
      userLon,
      zone.latitude,
      zone.longitude
    );

    if (distance <= zone.radius) {
      return true;
    }
  }

  return false;
};
