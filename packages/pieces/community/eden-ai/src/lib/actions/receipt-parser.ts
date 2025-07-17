import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const receiptParser = createAction({
  name: 'receipt_parser',
  displayName: 'Receipt Parser',
  description: 'Extract data from receipts.',
  auth: edenAiAuth,
  props: {
    file: Property.File({
      displayName: 'Receipt File',
      required: true,
    }),
    providers: Property.Array({
      displayName: 'Providers',
      required: true,
      description: 'Eden AI providers to use (e.g., ["mindee"]).',
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
      endpoint: 'ocr/receipt',
      body: formData,
    });
  },
}); 