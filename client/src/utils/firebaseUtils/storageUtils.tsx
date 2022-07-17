import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { app } from './firebaseConfig';

const storage = getStorage(app)

const getStorageFile = (fileRef: string) => {
    getDownloadURL(ref(storage, fileRef))
    .then(url => {
        window.open(url, '_blank')
    })
    .catch(err => {
        console.log(err)
    })
}

export { getStorageFile }