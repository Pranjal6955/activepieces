import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const textToSpeech = createAction({
  name: 'text_to_speech',
  displayName: 'Generate Audio From Text',
  description: 'Convert text to spoken audio.',
  auth: edenAiAuth,
  props: {
    text: Property.LongText({
      displayName: 'Text',
      required: true,
    }),
    providers: Property.Array({
      displayName: 'Providers',
      required: true,
      description: 'Eden AI providers to use (e.g., ["google"] or ["openai"]).',
    }),
  },
  async run({ auth, propsValue }) {
    return await edenAiRequest({
      auth,
      endpoint: 'audio/text_to_speech',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 