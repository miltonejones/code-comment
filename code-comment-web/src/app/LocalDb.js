import { CACHE_TABLE_DEF, DB_VERSION, INDEX_NAME } from "./Constants";
import Observer from "./Observables";
const indexDbResponse = new Observer("indexDbResponse");

class LocalDb$ {
  definitions = null;
  index = "";
  version = -1;

  init(definitions, index, version) {
    this.definitions = definitions;
    this.index = index;
    this.version = version;
  }

  connect() {
    return new Promise((callback) => {
      if (!this.index?.length) return callback({});
      try {
        const request = window.indexedDB.open(this.index, this.version);
        request.onerror = (error) => problemDb(request, error, callback);
        // connect success route
        request.onsuccess = () => successDb(request, callback);
        // upgrade success route
        request.onupgradeneeded = (event) =>
          upgradeDb(event, this.definitions, callback);
      } catch (e) {
        console.log({ e });
        callback("ERROR");
      }
    });
  }

  async selectOne(table, key, columns) {
    const db = await this.connect();
    const row = await commandDb(db, table, (store) =>
      store.get(isNaN(key) ? key : parseInt(key))
    );
    return !columns
      ? row
      : (function (o) {
          columns.map((f) => (o[f] = row[f]));
          return o;
        })({});
  }

  async select(table, where, columns, order) {
    const db = await this.connect();
    const rows = await commandDb(db, table, (store) => store.getAll());
    const records = (!where ? rows : rows.filter(where)).map((row) =>
      !columns
        ? row
        : (function (o) {
            columns.map((f) => (o[f] = row[f]));
            return o;
          })({})
    );
    return !order
      ? records
      : records.sort(
          typeof order === "string"
            ? (o, f) => (o[order] > f[order] ? 1 : -1)
            : order
        );
  }

  async delete(table, where) {
    const db = await this.connect();
    const rows = await this.select(table, where);
    await asyncLoop(rows, (row) =>
      commandDb(db, table, (store) => store.delete(row.ID), !0)
    );
    return Promise.resolve(`${rows.length} rows removed`);
  }

  async updateOne(table, key, values) {
    const db = await this.connect();
    const row = await this.selectOne(table, key);
    Object.assign(row, values);
    commandDb(db, table, (store) => store.put(row), !0);
    return Promise.resolve(`1 row updated`);
  }

  async update(table, where, values) {
    const db = await this.connect();
    const rows = await this.select(table, where);
    await asyncLoop(rows, (row) => {
      Object.assign(row, values);
      commandDb(db, table, (store) => store.put(row), !0);
    });
    return Promise.resolve(`${rows.length} rows updated`);
  }

  async insert(table, rows) {
    const db = await this.connect();
    await asyncLoop(rows, (row) => createRow(db, table, row));
    return Promise.resolve(`Operation Complete. ${rows.length} rows added.`);
  }

  async flush() {
    const tables = this.definitions.map((d) => d.name);
    await asyncLoop(tables, (table) => this.clear(table));
    return Promise.resolve("Done!");
  }

  async clear(table) {
    const db = await this.connect();
    return commandDb(db, table, (store) => store.clear());
  }

  async tally(table) {
    const db = await this.connect();
    if (db === "ERROR") {
      return 0;
    }
    return commandDb(db, table, (store) => store.count());
  }
}

const LOCAL_DATABASE_STATE = {
  ERROR: "ERROR",
  CONNECTED: "CONNECTED",
  PROGRESS: "PROGRESS",
  SETUP: "SETUP",
};

const createRow = async (db, indexName, row) => {
  return commandDb(db, indexName, (store) => store.add(row), true);
};

const commandDb = (db, indexName, requestFn, allowWrite) => {
  if (!db) return Promise.reject("LOCAL DATABASE NOT READY");
  return new Promise((callback, reject) => {
    try {
      const transaction = db.transaction(
        [indexName],
        allowWrite ? "readwrite" : "readonly"
      );
      const objectStore = transaction.objectStore(indexName);
      const dataRequest = requestFn(objectStore);
      dataRequest.onsuccess = function () {
        callback(dataRequest.result);
      };
      dataRequest.onerror = function (event) {
        console.log("Database failed to respond!!", event);
        reject({ message: "Database failed to respond!!" });
      };
    } catch (e) {
      reject("an error occurred: database not ready");
    }
  });
};

const problemDb = (request, error, callback) => {
  console.log("Database failed to open", error);
  indexDbResponse.next({
    state: LOCAL_DATABASE_STATE.ERROR,
    error,
    request,
  });
  !!callback && callback("ERROR");
};

const successDb = (request, callback) => {
  const db = request.result;
  indexDbResponse.next({
    state: LOCAL_DATABASE_STATE.CONNECTED,
    db,
    request,
  });
  !!callback && callback(db);
};

const percentDb = async (count, index, action) => {
  const progress = Math.floor((1 - (count - index) / count) * 100);
  indexDbResponse.next({
    state: LOCAL_DATABASE_STATE.PROGRESS,
    progress,
  });
  return await action();
};

const asyncLoop = async (rows, action) => {
  for (
    var row, i = 0;
    (row = rows[i++]);
    // eslint-disable-next-line no-loop-func
    await percentDb(rows.length, i, () => action(row))
  );
};

const upgradeDb = (event, definitions, callback) => {
  const db = event.target.result;
  definitions.map((definition) => {
    try {
      db.deleteObjectStore(definition.name);
    } catch (e) {
      console.log(e);
    }
    const objectStore = db.createObjectStore(definition.name, {
      keyPath: definition.key,
      autoIncrement: "auto" in definition ? definition.auto : true,
    });
    definition.fields.map((field) =>
      objectStore.createIndex(field, field, { unique: false })
    );
    return db;
  });
  console.log("Database setup complete");
  indexDbResponse.next({
    state: LOCAL_DATABASE_STATE.SETUP,
    db,
  });
  !!callback && callback(db);
};

const LocalDb = new LocalDb$();
export { LocalDb, indexDbResponse, LOCAL_DATABASE_STATE };

export const setupDb = async (_) => {
  LocalDb.init([CACHE_TABLE_DEF], INDEX_NAME, DB_VERSION);
  const count = await LocalDb.tally(CACHE_TABLE_DEF.name);
  return count;
};
