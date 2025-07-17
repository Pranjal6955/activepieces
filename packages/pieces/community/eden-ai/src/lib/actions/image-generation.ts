import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const imageGeneration = createAction({
  name: 'image_generation',
  displayName: 'Image Generation',
  description: 'Create images from text prompts.',
  auth: edenAiAuth,
  props: {
    prompt: Property.LongText({
      displayName: 'Prompt',
      required: true,
    }),
    providers: Property.Array({
      displayName: 'Providers',
      required: true,
      description: 'Eden AI providers to use (e.g., ["openai"] or ["stabilityai"]).',
    }),
  },
  async run({ auth, propsValue }) {
    return await edenAiRequest({
      auth,
      endpoint: 'image/generation',
      body: {
        text: propsValue.prompt,
        providers: propsValue.providers,
      },
    });
  },
}); 