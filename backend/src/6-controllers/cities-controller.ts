import express,{Request,Response,NextFunction} from 'express'
import logic from '../5-logic/cities-logic'
import { languageType } from '../4-models/cities-model';
const router = express.Router()

// http://localhost:3002/api/cities/israel
router.get("/cities/:country/:language", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const {country, language} = request.params;
        const cities = await logic.getCitiesByCountry(country, language as languageType)
        response.json(cities);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;