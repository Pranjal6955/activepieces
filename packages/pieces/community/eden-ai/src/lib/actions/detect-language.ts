import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const detectLanguage = createAction({
  name: 'detect_language',
  displayName: 'Detect Language of Text',
  description: 'Detect the language used in a text.',
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
      endpoint: 'text/language_detection',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 