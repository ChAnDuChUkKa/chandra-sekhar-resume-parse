import { Router } from 'express';
import { aiParseResume } from '../service/aiParser';
import { validateParsedData } from '../service/validator';
import { standardizeParsedData } from '../service/standardizer';

const router = Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const initialParsed = await aiParseResume(text);
    const standardized = standardizeParsedData(initialParsed);
    const validation = validateParsedData(standardized);
    res.json({ data: standardized, validation });
  } catch (e) {
    res.status(500).json({ error: 'Parsing failed', details: e });
  }
});

export default router;