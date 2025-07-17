import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const translateText = createAction({
  name: 'translate_text',
  displayName: 'Translate Text',
  description: 'Translate text into different languages.',
  auth: edenAiAuth,
  props: {
    text: Property.LongText({
      displayName: 'Text',
      required: true,
    }),
    source_language: Property.ShortText({
      displayName: 'Source Language',
      required: true,
    }),
    target_language: Property.ShortText({
      displayName: 'Target Language',
      required: true,
    }),
    providers: Property.Array({
      displayName: 'Providers',
      required: true,
      description: 'Eden AI providers to use (e.g., ["google"] or ["deepl"]).',
    }),
  },
  async run({ auth, propsValue }) {
    return await edenAiRequest({
      auth,
      endpoint: 'translation/automatic_translation',
      body: {
        text: propsValue.text,
        source_language: propsValue.source_language,
        target_language: propsValue.target_language,
        providers: propsValue.providers,
      },
    });
  },
}); 