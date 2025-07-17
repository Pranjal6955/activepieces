import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const ocr = createAction({
  name: 'ocr',
  displayName: 'Extract Text in Image (OCR)',
  description: 'Extract text from images (OCR).',
  auth: edenAiAuth,
  props: {
    file: Property.File({
      displayName: 'Image File',
      required: true,
    }),
    providers: Property.Array({
      displayName: 'Providers',
      required: true,
      description: 'Eden AI providers to use (e.g., ["google"] or ["mindee"]).',
    }),
  },
  async run({ auth, propsValue }) {
    const formData = new FormData();
    const byteCharacters = atob(propsValue.file.base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);
    formData.append('file', blob, propsValue.file.filename);
    formData.append('providers', JSON.stringify(propsValue.providers));
    return await edenAiRequest({
      auth,
      endpoint: 'ocr/ocr',
      body: formData,
    });
  },
}); 