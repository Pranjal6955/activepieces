import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const spellCheck = createAction({
  name: 'spell_check',
  displayName: 'Spell Check',
  description: 'Identify and correct spelling or grammar errors.',
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
      endpoint: 'text/spell_check',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 