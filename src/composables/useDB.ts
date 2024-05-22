const openDB = async (name: string, version?: number) => {
  const DBOpenRequest = window.indexedDB.open(name, version)
  const db = await new Promise<IDBDatabase>((resolve, reject) => {
    // we'll create the db schema and indexes here, if required (bumped version)
    // this callback will be called before onsuccess
    DBOpenRequest.onupgradeneeded = (event) => {
      // @ts-ignore
      const db: IDBDatabase = event?.target?.result ?? null
      if (db === null) throw new Error('db could not be opened')
      db.createObjectStore('factSheets', { keyPath: 'id' })
      // factSheetStore.createIndex('name', 'name', { unique: false })
    }

    DBOpenRequest.onerror = () => reject(DBOpenRequest.error)
    DBOpenRequest.onsuccess = () => resolve(DBOpenRequest.result)
  })
  return db
}

const setFactSheet = async (params: { id: string; name: string }) => {
  const { id, name } = params
  const factSheet: IFactSheet = {
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    name
  }
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<IFactSheet>(async (resolve, reject) => {
    const db = await openDB('leanix')
    const request = db
      .transaction('factSheets', 'readwrite')
      .objectStore('factSheets')
      .add(factSheet)
    request.onsuccess = () => resolve(factSheet)
    request.onerror = () => reject(request.error)
  })
}

const getFactSheets = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<IFactSheet[]>(async (resolve, reject) => {
    const db = await openDB('leanix')
    const request = db
      .transaction('factSheets')
      .objectStore('factSheets')
      .getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

const useDB = () => {
  return {
    openDB,
    setFactSheet,
    getFactSheets
  }
}

export { useDB }
