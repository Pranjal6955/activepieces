import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const invoiceParser = createAction({
  name: 'invoice_parser',
  displayName: 'Invoice Parser',
  description: 'Extract structured invoice data from files.',
  auth: edenAiAuth,
  props: {
    file: Property.File({
      displayName: 'Invoice File',
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
      endpoint: 'ocr/invoice',
      body: formData,
    });
  },
}); 