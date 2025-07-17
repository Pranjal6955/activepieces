
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
    import { generateText } from './lib/actions/generate-text';
    import { summarizeText } from './lib/actions/summarize-text';
    import { extractKeywords } from './lib/actions/extract-keywords';
    import { detectLanguage } from './lib/actions/detect-language';
    import { extractEntities } from './lib/actions/extract-entities';
    import { moderateText } from './lib/actions/moderate-text';
    import { spellCheck } from './lib/actions/spell-check';
    import { translateText } from './lib/actions/translate-text';
    import { invoiceParser } from './lib/actions/invoice-parser';
    import { receiptParser } from './lib/actions/receipt-parser';
    import { ocr } from './lib/actions/ocr';
    import { imageGeneration } from './lib/actions/image-generation';
    import { textToSpeech } from './lib/actions/text-to-speech';

    export const edenAiAuth = PieceAuth.SecretText({
      displayName: 'API Key',
      required: true,
      description: 'Enter your Eden AI API key.',
    });

    export const edenAi = createPiece({
      displayName: "Eden AI",
      auth: edenAiAuth,
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://cdn.activepieces.com/pieces/eden-ai.png",
      authors: [],
      actions: [
        generateText,
        summarizeText,
        extractKeywords,
        detectLanguage,
        extractEntities,
        moderateText,
        spellCheck,
        translateText,
        invoiceParser,
        receiptParser,
        ocr,
        imageGeneration,
        textToSpeech,
      ],
      triggers: [],
    });
    