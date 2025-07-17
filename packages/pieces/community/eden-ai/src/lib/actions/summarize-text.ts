import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const summarizeText = createAction({
  name: 'summarize_text',
  displayName: 'Summarize Text',
  description: 'Extract key sentences from long passages.',
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
      endpoint: 'text/summarization',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 