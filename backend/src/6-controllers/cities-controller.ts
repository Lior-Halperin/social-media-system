import express,{Request,Response,NextFunction} from 'express'
import logic from '../5-logic/cities-logic'
const router = express.Router()

// http://localhost:3002/api/cities/israel
router.get("/cities/:country", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const country = request.params.country;
        
        const cities = await logic.getCitiesByCountry(country)
        console.log(cities)
        console.log(JSON.stringify(cities))
        response.json(cities);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;