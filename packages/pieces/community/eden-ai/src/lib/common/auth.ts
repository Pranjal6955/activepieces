import { PieceAuth } from '@activepieces/pieces-framework';

export const edenAiAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: 'Enter your Eden AI API key.',
}); 