import { storage } from '../config/firebase';

const previewFile = (file: File, callback: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
      return reader.result
    };
    reader.readAsDataURL(file);
}

const randomString = (length: number, chars: string, result: string) => {
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

const uploadToFirebase = async (image: any) => {
    try { 
        let imageUrl: any = [];
            const imageName = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', image.name)
            const storageRef = storage.ref();
            const fileRef = storageRef.child(`mansa/${imageName}`);
            const fileUpload  = await fileRef.put(image.blobFile)
            const fileUploadUrl = await fileUpload.ref.getDownloadURL()
            imageUrl = fileUploadUrl;
        return imageUrl;
    } catch (error) {
        return error;
    }
}

export {previewFile, uploadToFirebase};