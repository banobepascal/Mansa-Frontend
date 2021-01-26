import react, { useState, useEffect } from 'react';
import { Uploader, Alert, Loader, Icon } from 'rsuite';
import React from 'react';
import { FileType } from 'rsuite/lib/Uploader';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';

function previewFile(file: any, callback: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
  
  const styles = {
    width: 100,
    height: 100,
    borderRadius: "50%"
  };
  
const ImageUploader = () => {
    const [imageUrl, changeImageUrl] = useState("");
    const store = useStore();
    const { changeDataUrl, userProfile } = store.settingsStore;

    useEffect(() => {
      if (userProfile.photoURL) {
        changeImageUrl(userProfile.photoURL)
      }
    }, [userProfile, changeImageUrl]);

    return (
      <Uploader
        fileListVisible={false}
        listType="picture"
        onChange={changeDataUrl}
        onUpload={file => {
          previewFile(file.blobFile, (value: any) => {
            changeImageUrl(value);
            changeDataUrl(file);
          });
        }}
      >
        <button style={styles}>
          {imageUrl ? (
            <img src={imageUrl} alt="" width="100%" height="100%" />
          ) : (
            <Icon icon="avatar" size="3x" />
          )}
        </button>
      </Uploader>
    );
  };
  
  export default observer(ImageUploader);
