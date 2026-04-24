import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface ArchDocument {
  id: string;
  title: string;
  clientName: string;
  price: number;
  pdfData: string; // Base64 string
  createdAt: number;
  ownerId: string;
  isUnlocked?: boolean;
}

export const DUMMY_DOCUMENT: ArchDocument = {
  id: 'demo-villa-plans',
  title: 'Sample Villa Plans',
  clientName: 'John Doe',
  price: 1500.00,
  pdfData: 'data:application/pdf;base64,JVBERi0xLjAKMSAwIG9iaiA8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PiBlbmRvYmogMiAwIG9iaiA8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PiBlbmRvYmogMyAwIG9iaiA8PC9UeXBlL1BhZ2UvTWVkaWFCb3hbMCAwIDYxMiA3OTJdL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4gZW5kb2JqIDQgMCBvYmogPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4gZW5kb2JqIDUgMCBvYmogPDwvTGVuZ3RoIDQ0Pj4gc3RyZWFtCkJUCi9GMSAyNCBUZgoxMDAgMTAwIFRkCihTYW1wbGUgQXJjaGl0ZWN0dXJhbCBQbGFuKSBUagpFVAplbmRzdHJlYW0gZW5kb2JqIHhyZWYKMCA2CjAwMDAwMDAwMDAgNjUzMzUgZgoyMDAwMDAwMDEwIDAwMDAwIG4KMDAwMDAwMDA1MyAwMDAwMCBuCjAwMDAwMDAxMDIgMDAwMDAgbgowMDAwMDAwMjQ5IDAwMDAwIG4KMDAwMDAwMDMzNiAwMDAwMCBuCnRyYWlsZXIgPDwvU2l6ZSA2L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDMxCiUlRU9GCg==',
  createdAt: Date.now(),
  ownerId: 'dummy-owner',
  isUnlocked: false,
};

export const saveDocument = async (documentData: ArchDocument): Promise<void> => {
  const docRef = doc(db, 'documents', documentData.id);
  await setDoc(docRef, {
    ...documentData,
    ownerId: 'admin',
    isUnlocked: false
  });
};

export const unlockDocument = async (id: string): Promise<void> => {
  if (id === DUMMY_DOCUMENT.id) return;
  const docRef = doc(db, 'documents', id);
  await setDoc(docRef, { isUnlocked: true }, { merge: true });
};

export const getDocument = async (id: string): Promise<ArchDocument | null> => {
  if (id === DUMMY_DOCUMENT.id) {
    return DUMMY_DOCUMENT;
  }
  
  const docRef = doc(db, 'documents', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data() as ArchDocument;
  }
  return null;
};

export const getAllDocuments = async (): Promise<ArchDocument[]> => {
  const q = query(
    collection(db, 'documents'),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const docs: ArchDocument[] = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.data() as ArchDocument);
  });
  
  return docs;
};

export const deleteDocument = async (id: string): Promise<void> => {
  const docRef = doc(db, 'documents', id);
  await deleteDoc(docRef);
};

