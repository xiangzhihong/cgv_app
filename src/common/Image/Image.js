import React from 'react';
import Image from 'react-native-fast-image';
import {bizstream} from '../../bizstream';

export default ({uri, ...remainder}) => (
  <Image source={{uri: bizstream.getMediaUrl() + uri}} {...remainder} />
);

function getUriImage(uri) {
  return uri !== null &&
    uri !== undefined &&
    uri.includes('/') &&
    uri.includes('.')
    ? uri
    : '';
}
