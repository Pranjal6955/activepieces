import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const extractKeywords = createAction({
  name: 'extract_keywords',
  displayName: 'Extract Keywords in Text',
  description: 'Identify important terms in a text.',
  auth: edenAiAuth,
  props: {
    text: Property.LongText({
      displayName: 'Text',
      required: true,
    }),
    providers: Property.Array({
      displayName: 'Providers',
      required: true,
      description: 'Eden AI providers to use (e.g., ["openai"]).',
    }),
  },
  async run({ auth, propsValue }) {
    return await edenAiRequest({
      auth,
      endpoint: 'text/keyword_extraction',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 