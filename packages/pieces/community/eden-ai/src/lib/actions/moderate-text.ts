import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const moderateText = createAction({
  name: 'moderate_text',
  displayName: 'Moderate Text',
  description: 'Detect explicit or policy-violating text.',
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
      endpoint: 'text/moderation',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 