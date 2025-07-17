import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const generateText = createAction({
  name: 'generate_text',
  displayName: 'Generate Text',
  description: 'Produce GPT-style text completions from prompts.',
  auth: edenAiAuth,
  props: {
    prompt: Property.LongText({
      displayName: 'Prompt',
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
      endpoint: 'text/generation',
      body: {
        text: propsValue.prompt,
        providers: propsValue.providers,
      },
    });
  },
}); 