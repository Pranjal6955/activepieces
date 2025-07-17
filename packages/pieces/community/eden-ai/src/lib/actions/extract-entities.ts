import { createAction, Property } from '@activepieces/pieces-framework';
import { edenAiAuth } from '../../index';
import { edenAiRequest } from '../common/client';

export const extractEntities = createAction({
  name: 'extract_entities',
  displayName: 'Extract Named Entities in Text',
  description: 'Identify entities (names, places) in text.',
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
      endpoint: 'text/ner',
      body: {
        text: propsValue.text,
        providers: propsValue.providers,
      },
    });
  },
}); 